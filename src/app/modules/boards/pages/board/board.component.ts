import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { ToDo, Column } from '@models/todo.model';
import { SharedService } from '@services/shared.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Card, GetBoardDetail, List } from '@models/board.model';
import { CardService } from '@services/card.service';
import { ListService } from '../../../../services/list.service';
import { BACKGROUNDS, COLORS, Colors } from '../../../../models/color.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit, OnDestroy {
  todos: ToDo[] = [];
  doing: ToDo[] = [];
  done: ToDo[] = [];
  boardDetail: GetBoardDetail | null = null;
  boardId: string = '';
  addCardForm!: FormControl;
  addAnotherList!: FormControl;
  showListForm: boolean = false;
  colorBackground = BACKGROUNDS;

  constructor(
    private dialog: Dialog,
    private sharedService: SharedService,
    private activateRoute: ActivatedRoute,
    private cardService: CardService,
    private listService: ListService
  ) {}


  ngOnDestroy(): void {
    this.sharedService.setBackgroundColor('sky')
  }

  ngOnInit(): void {
    this.getIdFromParams();
    this.initFormAddCard();
  }

  initFormAddCard() {
    this.addCardForm = new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    });

    this.addAnotherList = new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    });
  }

  getIdFromParams() {
    this.activateRoute.paramMap.subscribe({
      next: ({ params }: Params) => {
        const { id } = params;
        if (id) {
          this.boardId = id;
          this.getBoardDetail();
        }
      },
    });
  }

  getBoardDetail() {
    this.sharedService.getBoardDetail(this.boardId).subscribe({
      next: (boardDetail) => {
        this.boardDetail = boardDetail;
        this.boardDetail.lists = this.boardDetail.lists.map((list) => {
          return { ...list, showCardForm: false };
        });
        this.sharedService.setBackgroundColor(this.boardDetail.backgroundColor); // BehaviorSubject
        console.log(this.boardDetail);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  drop(event: CdkDragDrop<any>) {
    // movimiento en la misma lista
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // movimiento hacia otra lista
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const card = event.container.data[event.currentIndex];
    const newPosition = this.sharedService.getPosition(
      event.container.data,
      event.currentIndex
    );
    const listIdCard = event.container.id;
    this.updateCard(card, newPosition.position, listIdCard);
  }

  addList() {
    const title = this.addAnotherList.value;

    if (this.boardDetail) {
      const newListData = {
        title,
        boardId: this.boardDetail?.id,
        position: this.sharedService.getPositionNewItem(this.boardDetail.lists),
      };
      this.listService.createList(newListData).subscribe({
        next: (resp) => {
          // console.log(resp);
          this.getBoardDetail();
          this.addAnotherList.setValue('');
        },
        error: (err) => console.log(err),
      });
    }
  }

  openDialog(task: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        task,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }

  // mostrar solo un formulario de agg card
  openFormCard(list: List) {
    if (this.boardDetail?.lists) {
      this.boardDetail.lists = this.boardDetail?.lists.map((listD) => ({
        ...listD,
        showCardForm: listD.id === list.id,
      }));
    }
  }

  createCard(list: List) {
    const title = this.addCardForm.value;

    if (this.boardDetail) {
      const dataCreateNewCard = {
        title,
        position: this.sharedService.getPositionNewItem(this.boardDetail.cards),
        listId: list.id,
        boardId: this.boardDetail?.id,
      };
      this.cardService.createCard(dataCreateNewCard).subscribe({
        next: (card) => {
          list.cards?.push(card);
          this.addCardForm.setValue('');
          list.showCardForm = false;
        },
      });
    }

    console.log(title);
  }

  closeCardForm(list: List) {
    list.showCardForm = false;
  }

  private updateCard(card: Card, position: number, listId: string) {
    console.log(position);
    this.cardService.updateCard(card.id, { position, listId }).subscribe({
      next: (resp) => {
        console.log(resp);
        // la base de datos por debajo retorna el listado de cards ordenados ( orderBy: position )
        this.getBoardDetail();
      },
      error: () => {
        console.log();
      },
    });
  }

  get colors() {
    if (this.boardDetail) {
      const classes = this.colorBackground[this.boardDetail.backgroundColor];
      return classes || {};
    }
    return {};
  }
}

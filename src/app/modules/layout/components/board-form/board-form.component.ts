import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Colors } from '@models/color.model';
import { SharedService } from '@services/shared.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent implements OnInit {
  // emitir un valor hacia el padre
  @Output() closeOverlay = new EventEmitter<boolean>();

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.nonNullable.group({
      title: ['', [Validators.required]],
      backgroundColor: new FormControl<Colors>('sky', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      this.createBoard(title, backgroundColor);
    } else {
      this.form.markAllAsTouched();
    }
  }

  createBoard(title: string, backgroundColor: Colors) {
    this.sharedService.createBoard(title, backgroundColor).subscribe({
      next: (board) => {
        console.log(board);
        // ...app/boards/:id
        this.router.navigate(['/app/boards', board.id]);
        this.closeOverlay.next(false); // comunicacion con el padre
      },
      error: (err) => console.log(err),
    });
  }
}

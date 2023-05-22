import { List } from './board.model';

export interface CreateListDto
  extends Omit<
    List,
    'id' | 'cards' | 'creationAt' | 'updatedAt' | 'description' | 'showCardForm'
  > {
  boardId: string;
}

export interface CreateListResponse {
    title:      string;
    position:   number;
    board:      Board;
    id:         number;
    creationAt: string;
    updatedAt:  string;
}

export interface Board {
    id:              number;
    title:           string;
    backgroundColor: string;
    creationAt:      string;
    updatedAt:       string;
}

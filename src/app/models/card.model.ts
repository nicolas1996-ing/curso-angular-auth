export interface UpdatesCardDto {
  title?: string;
  description?: string;
  position?: number;
  listId?: string;
  boardId?: string;
}

export interface CreateCardDto {
  title: string;
  position: number;
  description?: string;
  listId: number;
  boardId: string;
}

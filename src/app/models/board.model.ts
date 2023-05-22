import { Colors } from './color.model';
import { User } from './user.model';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Colors;
  members: User[];
}

export interface GetBoardDetail {
  id: string;
  title: string;
  backgroundColor: Colors;
  creationAt: string;
  updatedAt: string;
  members: Member[];
  lists: List[];
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  description: string;
  position: number;
  creationAt: string;
  updatedAt: string;
  list: List;
}

export interface List {
  id: number;
  title: string;
  position: number;
  creationAt: string;
  updatedAt: string;
  cards?: Card[];
  description?: string;
  showCardForm?: boolean;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

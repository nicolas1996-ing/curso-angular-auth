import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '../../../../services/users.service';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getUserProfile();
  }

  getUserProfile() {
    // no hace un request http 
    this.authService.user$.subscribe({
      next: (currentUser) => (this.user = currentUser),
    });
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.init(users);
      },
      error: (err) => {},
    });
  }

  
}

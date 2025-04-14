import { Component } from '@angular/core';

interface UserList  {
  id:number;
  name:string;
  email:string;
  status:'Online' | 'Offline';
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  userList: UserList[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Online' },
    { id: 2, name: 'den Doe', email: 'den@example.com', status: 'Online' },
    { id: 3, name: 'Jorge Doe', email: 'jorge@example.com', status: 'Offline'}

  ]
}

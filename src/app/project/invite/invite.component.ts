import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  items: Array<object> = [
    {
      id: 1,
      name: 'zhangsan'
    },
    {
      id: 2,
      name: 'lisi'
    },
    {
      id: 3,
      name: 'wangwu'
    },
    {
      id: 4,
      name: 'zhaoliu'
    },
    {
      id: 5,
      name: 'sunqi'
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  displayUser(user: { id: string; name: string }) {
    return user ? user.name : '';
  }
  onClick() {

  }
}

/*
user: { id: string; name: string } === user: User


{ id: string; name: string } 等价于 export interface User
export interface User{
  id:string;
  name:string;
}
*/




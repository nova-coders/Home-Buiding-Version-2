import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.scroll(0, 0);
  }
}

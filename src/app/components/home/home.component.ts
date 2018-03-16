import { Component, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDatepickerContent } from '@angular/material';

import { CalendarComponent } from '../calendar/calendar.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private viewContainerRef: ViewContainerRef,
  			  private dialog: MatDialog) { }

  openCalendar() {
  	this.dialog.open(CalendarComponent);
  }

}

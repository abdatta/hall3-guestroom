import { Component, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDatepickerContent } from '@angular/material';

import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private viewContainerRef: ViewContainerRef,
  			      private dialog: MatDialog) {}
  
  openCalendar() {
  	this.dialog.open(CalendarComponent);
  }
}


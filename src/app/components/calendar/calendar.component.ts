import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { BookingService } from '../../services/booking/booking.service'

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

	dates: Date[][] = [[new Date(2018, 2, 30),new Date(2018, 2, 31)]];
  colors = ['red', 'orangered', 'coral', 'navajowhite'];

	today: Date;
	minDate: Date;
	maxDate: Date;

	datesSubscription: Subscription;

  constructor(private dialogRef: MatDialogRef<CalendarComponent>,
  			  private bookingService: BookingService) { }

  ngOnInit() {
  	this.today = new Date();
    this.minDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth()+2, 0);

    this.datesSubscription = this.bookingService
    .subscribeDates((dates: Date[][]) => this.dates = dates);

    this.bookingService.updateDates();
  }

  ngOnDestroy() {
    this.datesSubscription.unsubscribe();
  }

}

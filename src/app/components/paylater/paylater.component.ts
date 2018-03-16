import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { BookingData } from '../../models/booking-data';

import { BookingService } from '../../services/booking/booking.service'

import '../../../assets/checkout.js'

declare var Instamojo: any;

@Component({
  selector: 'app-paylater',
  templateUrl: './paylater.component.html',
  styleUrls: ['./paylater.component.css']
})
export class PaylaterComponent implements OnInit {

	loaded = false;
	already_paid = false;
  payerror = false;
	sending = false;
	id: number;
  data: BookingData  = {
        name: 'Abhishek Datta',
        email: 'payment@example.com',
        roll: '160027',//null,
        phone: '7003801867',
        visit: 'Summer',
        addr: 'Kalyani,\nW.B.',
        rooms: 0,
        from: new Date(2018,1,1),
        to: new Date(2018,1,1),
        guests: [
          {
            name: 'Rohan',
            age: '19',
            sex: 'M',
            rel: 'Me'
          }
        ]
      };
  roomrent: number;
  automation: number;
  payurl: string;

  constructor(private bookingService: BookingService,
  						private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.route.params.subscribe((params: Params) => {
  		this.id = params['id'];
  		this.getData(this.id);
  	});
  }

  getData(id: number) {
  	this.bookingService.getBookingInfo(id)
      .subscribe((data: BookingData) => {
          this.data = data;
          this.data.from = new Date(data.from);
          this.data.to = new Date(data.to);
          this.roomrent = this.data.rooms * this.getDays() * 360;
    			this.automation = (this.roomrent+3)*2/98 + 3;
    			this.loaded = true;
      },
      (err: any) => {
      	if(err.status == 400)
      		this.already_paid = true;
      	else
          this.snackBar.open('Oops! Some error occured', 'Refresh', { duration: 3333 })
            .onAction().subscribe(() => this.getData(id)); //TODO: To remove duration and put snackbar cancel in ondestroy
      });
  }

  getDays(): number {
  	const milli = this.data.to.getTime() - this.data.from.getTime();
  	return 1 + milli/(24*60*60*1000);
  }

  openpayment() {
    if(this.payurl)
      Instamojo.open(this.payurl);
    else
    {
      this.sending = true;
      this.bookingService.paylater(this.id)
        .subscribe((url: string) => {
            this.payurl = url;
            Instamojo.open(url);
            this.sending = false;
        },
        (err: any) => {
          if(err.status == 503) {
            this.bookingService.bookingdata = undefined;
            this.payerror = true;
          }
          else {
            this.snackBar.open('Oops! Some error occured', 'Retry', { duration: 3333 })
              .onAction().subscribe(() => this.openpayment());
            this.sending = false;
          }
        });
      }
    }
    

}

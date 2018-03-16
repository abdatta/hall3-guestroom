import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { BookingData } from '../../models/booking-data';

import { BookingService } from '../../services/booking/booking.service'

import '../../../assets/checkout.js'

declare var Instamojo: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  sending = false;
  payerror = false;
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
              private snackBar: MatSnackBar,
  						private router: Router) { }

  ngOnInit() { 
  	if(this.bookingService.bookingdata)
  		this.data = this.bookingService.bookingdata;
  	else
  		this.router.navigate(['/book']);

  	// console.log(this.data);

    this.roomrent = this.data.rooms * this.getDays() * 360;
    this.automation = (this.roomrent+3)*2/98 + 3;
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
      this.bookingService.paynow(this.data)
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

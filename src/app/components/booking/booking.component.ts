import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar, DateAdapter, MatDialog } from '@angular/material';
import { Router } from '@angular/router'

import { isNumeric } from 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';

import { BookingData } from '../../models/booking-data';

import { BookingService } from '../../services/booking/booking.service'

@Component({
  selector: 'app-book',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {

  infoForm: FormGroup;
  datesForm: FormGroup;
  guestsForm: FormGroup;

  sending: boolean;
  sent: boolean;
  loaded: boolean;

  data: BookingData;
  tokenId: number;

  available: Date[][];
  availableSubscription: Subscription;

  today: Date;
  minDate: Date;
  maxDate: Date;

  constructor(private formBuilder: FormBuilder,
              private dateAdapter: DateAdapter<Date>,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private bookingService: BookingService,
              public router: Router) { }

  ngOnInit() {
    this.stateInit();
    this.datesInit();
    this.formsInit();
  }

  stateInit() {
    this.sending = false;
    this.sent = false;
    this.loaded = false;
    if(this.bookingService.bookingdata)
      this.data = this.bookingService.bookingdata;
    else {
      this.data = {
        name: '',//Abhishek Datta',
        email: '',//sample@example.com',
        roll: '',//160027',//null,
        phone: '',//7003801867',
        visit: '',//Winter',
        addr: '',//Kalyani,\nW.B.',
        rooms: null,
        from: null,
        to: null,
        guests: [
          {
            name: '',
            age: '',
            sex: '',
            rel: ''
          }
        ]
      }  
    }
  }

  datesInit() {
    this.today = new Date();
    this.minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth()+2, 0);

    this.dateAdapter.setLocale('en-IN');

    this.availableSubscription = this.bookingService.subscribeDates(
      (dates: Date[][]) => {
        if(dates) {
          this.available = dates;
          this.loaded = true;
        }
      }
    );
    
    this.bookingService.updateDates();
  }

  formsInit() {
    this.infoForm = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      emailCtrl: ['', [ Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)] ],
      rollCtrl: ['', Validators.required],
      phoneCtrl: ['', [ Validators.required, Validators.maxLength(10), Validators.pattern(/[0-9]{10}/)] ],
      visitCtrl: ['', Validators.required],
      addrCtrl: ['', Validators.required]
    });
    this.datesForm = this.formBuilder.group({
      roomsCtrl: ['', Validators.required],
      fromCtrl: ['', [ Validators.required, this.validateRange, this.validateAvailability ] ],
      toCtrl: ['', [ Validators.required, this.validateRange, this.validateAvailability ] ]
    });
    this.guestsForm = this.formBuilder.group({
      guests: this.formBuilder.array([ this.newGuestCtrl() ])
    });
  }

  isDate = (date: Date): boolean => (date && !isNaN(date.getTime()));

  validateRange = (c: FormControl) => {
    if(this.isDate(this.data.from) && this.isDate(this.data.to)) 
      if (this.data.from > this.data.to)
        return {
          validateRange: {
            valid: false
          }
        }
    return null;
  }

  validateAvailability = (c: FormControl) => {
    if(this.isDate(this.data.from) && this.isDate(this.data.to)) {
      if(this.isRangeAvailable(this.data.rooms))
        return null;
      else
        return {
          validateAvailability: {
            valid: false
          }
        }
    }
    else {
      if(this.isAvailable(new Date(c.value), this.data.rooms))
        return null;
      else
        return {
          validateAvailability: {
            valid: false
          }
        }
    }
  }

  isRangeAvailable(rooms: number): boolean {
    const to = new Date(this.data.to);
    const from = new Date(this.data.from);

    for (var i = from; i <= to; i.setDate(i.getDate()+1))
      if(!this.isAvailable(i, rooms))
        return false;
    
    return true;
  }

  isAvailable(date: Date, rooms: number): boolean {
    //if(!this.available || rooms > this.available.length) // Error Handling 
      //return false;
    for (var i = rooms - 1; i >= 0; i--)
      for (var j = this.available[i].length - 1; j >= 0; j--)
        if (this.available[i][j].getTime() == date.getTime())
          return false;
    return true;
  }

  newGuestCtrl(): FormGroup {
    return this.formBuilder.group({
          nameCtrl: ['', Validators.required],
          ageCtrl: ['', [ Validators.required, Validators.min(0) ] ],
          sexCtrl: ['', Validators.required],
          relCtrl: ['', Validators.required]
        })
  }

  addGuest() {
    this.data['guests'].push({
      name: '',
      age: '',
      sex: '',
      rel: ''
    });
    
    (this.guestsForm.get('guests') as FormArray)
      .push(this.newGuestCtrl());
  }

  removeGuest() {
    if(this.data['guests'].length > 1) {
      this.data['guests'].pop();
      (this.guestsForm.get('guests') as FormArray)
        .removeAt(-1);
      }
  }

  book() {
   let flag = true;
   for(let guest of this.data.guests)
   {
     if(guest.name === '' || !(isNumeric(guest.age) && parseInt(guest.age)>=0) || guest.sex === '' || guest.rel == '')
     {
       flag = false;
       break;
     }
     if(isNumeric(guest.age))
       guest.age = ''+parseInt(guest.age);
   }
   
   if(flag) {
     this.sending = true;
     this.bookingService.bookRooms(this.data)
        .subscribe((id: number) => {
            this.tokenId = id;
            this.sent = true;
        },
        (err: any) => {
            this.snackBar.open('Oops! Some error occured', 'Retry', { duration: 3333 })
              .onAction().subscribe(() => this.book());
            this.sending = false;
        });
    }
  }

  paynow() {
    let flag = true;
    for(let guest of this.data.guests)
    {
     if(guest.name === '' || !(isNumeric(guest.age) && parseInt(guest.age)>=0) || guest.sex === '' || guest.rel == '')
     {
       flag = false;
       break;
     }
     if(isNumeric(guest.age))
       guest.age = ''+parseInt(guest.age);
    }

    if(flag) {
      this.bookingService.bookingdata = this.data;
      this.router.navigate(['/payment']);
    }
  }

  ngOnDestroy() {
    this.availableSubscription.unsubscribe();
  }

}

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';


import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { Http, Response, RequestOptions } from '@angular/http';

import { BookingData } from '../../models/booking-data';

@Injectable()
export class BookingService {

  private dates = new BehaviorSubject<Date[][]>(undefined);
  private snackbarRef: MatSnackBarRef<SimpleSnackBar>;

  bookingdata: BookingData;

  constructor( private http: Http, private snackBar: MatSnackBar) {}

  subscribeDates(onEmit: (dates: Date[][]) => void): Subscription {
    return this.dates.subscribe(onEmit);
  }

  /*
   * Updates the observable with an array of Date Ranges such that,
   * the ith index has i number of rooms available
   */
  updateDates() {
    this.http.get('/server/dates')
      .subscribe(
        (res: Response) => {
          this.dates.next((res.json() as Date[][]).map(rooms => rooms.map(date => new Date(date))));
          if(this.snackbarRef) this.snackbarRef.dismiss();
        },
        (err: Error) => {
          if(!this.dates.getValue())
            (this.snackbarRef = this.snackBar.open('Oops! Some error occured', 'Reload'))
              .onAction().subscribe(() => this.updateDates());
        }
      );
  }

  getBookingInfo(id: number): Observable<BookingData> {
    return this.http.get('/server/booking/'+id)
      .map((res:Response) => res.json() as BookingData)
      .catch((error: any) => Observable.throw(error));
  }

  bookRooms(data: BookingData): Observable<number> {
    return this.http.post('/server/book', data)
      .map((res: Response) => res.text())
      .catch((error: any) => Observable.throw(error));
  };

  paynow(data: BookingData): Observable<string> {
    return this.http.post('/server/pay', data)
      .map((res: Response) => res.text())
      .catch((error: any) => Observable.throw(error));
  }

  paylater(id: number): Observable<string> {
    return this.http.get('/server/pay/'+id)
      .map((res: Response) => res.text())
      .catch((error: any) => Observable.throw(error));
  }

  respond(id: number, acc: boolean): Observable<number> {
    return this.http.post('/server/respond', { tokenId: id, accept: acc })
      .map((res: Response) => res.status)
      .catch((error: any) => {
        if (error.status)
          return Observable.of(error.status);
        else
          return Observable.throw(error.message || error);
      });
  }
}

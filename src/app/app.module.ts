import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { // always import this after BrowserAnimationsModule
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatInputModule,
  MatStepperModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatDialogModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { BookingService } from './services/booking/booking.service'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BookingComponent } from './components/booking/booking.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AvailabilityDirective } from './components/calendar/availability.directive';
import { RespondComponent } from './components/respond/respond.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaylaterComponent } from './components/paylater/paylater.component';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookingComponent,
    CalendarComponent,
    AvailabilityDirective,
    RespondComponent,
    PaymentComponent,
    PaylaterComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule, FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    BookingService
  ],
  entryComponents: [CalendarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

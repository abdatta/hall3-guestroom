import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* importing components here */
import { HomeComponent } from './components/home/home.component';
import { BookingComponent } from './components/booking/booking.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaylaterComponent } from './components/paylater/paylater.component';
import { SuccessComponent } from './components/success/success.component';
import { RespondComponent } from './components/respond/respond.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: BookingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment/success', component: SuccessComponent },
  { path: 'payment/:id', component: PaylaterComponent },
  { path: 'respond/:id', component: RespondComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
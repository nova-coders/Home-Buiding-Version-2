import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';
import { ServicePaymentComponent } from 'app/layouts/service-payment/service-payment.component';
import { servicePaymentRoute } from './service-payment.route';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ServicePaymentComponent],
  exports: [ServicePaymentComponent],
  imports: [CommonModule, NgxPayPalModule, RouterModule.forRoot([servicePaymentRoute], { useHash: true }), FormsModule],
})
export class ServicePaymentModule {}

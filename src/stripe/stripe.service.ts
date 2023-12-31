import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import * as paypal from 'paypal-rest-sdk';

@Injectable()
export class StripeService {

  private stripe: Stripe;

  // constructor(private config: ConfigService) {
  //   this.stripe = new Stripe(config.get('secretKey'), {
  //     apiVersion: '2023-10-16'
  //   })
  // }

  constructor(private config: ConfigService) {
    const clientId = this.config.get('clientId')
    const clientKey = this.config.get('secretKey')
  
    paypal.configure({
      mode: 'sandbox', // Use 'sandbox' for testing
      client_id: clientId,
      client_secret: clientKey,
    });

  }




  // async createCustomer(body) {
  //   return this.stripe.customers.create({
  //     name: body.name,
  //     email: body.email
  //   })
  // }


  // async charge() {
  //   return this.stripe.paymentIntents.create({
  //     amount: 20000 * 100,
  //     customer: 'cus_PFfv5hxsNUVMw0',
  //     payment_method: 'pm_card_visa',
  //     currency: 'usd',
  //     confirm: true,
  //     return_url: 'https://your-website.com/checkout-success',
  //     // automatic_payment_methods: true
  //   })
  // }

  


}

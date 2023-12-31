import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';

@Controller('stripe')
export class StripeController {

  constructor(private readonly stripeService: StripeService) { }

  @Post('/post')
  create(@Body() body) {
    // return this.stripeService.createCustomer(body)
  }

  @Post('/post1')
  charge(@Body() body) {
    // return this.stripeService.charge()
  }



}

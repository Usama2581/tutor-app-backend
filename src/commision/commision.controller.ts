import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CommisionService } from './commision.service';


@Controller('commision')
export class CommisionController {

  constructor(private readonly commisionService: CommisionService) { }


  @Put('/update')
  update(@Body() body) {
      try {
        return this.commisionService.update(body)
      } catch (error) {
        return error.response
      }
  }

  @Get('/sum')
  getSum(@Query('value') value, @Query('id') id) {
    try {
      return this.commisionService.sum(value, id)
    } catch (error) {
      return error.response
    }
  }
}

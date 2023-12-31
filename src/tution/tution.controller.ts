import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TutionService } from './tution.service';


@Controller('tution')
export class TutionController {

  constructor(private readonly tutionService: TutionService) { }

  @Post('/post')
  create(@Body() body) {
    try {
      return this.tutionService.postTution(body)
    } catch (error) {
      return error.response
    }
  }

  @Get('/get')
  findAll() {
    try {
      return this.tutionService.find()
    } catch (error) {
      return error.response
    }
  }

  @Get('/get/:id')
  findUserTution(@Param('id') id) {
    try {
      return this.tutionService.findUserTution(id)
    } catch (error) {
      return error.response
    }
  }


  @Get('/tutionIfProposalFound')
  findTutionIfProposalExsis(@Query('user') userId, @Query('tution') tutionId) {
    try {
      return this.tutionService.findTutionIfProposalExsist(userId, tutionId)
    } catch (error) {
      return error.response
    }
  }

  @Put('/update')
  updateTution(@Query('user') userId, @Query('tution') tutionId, @Body() body) {
    try {
      return this.tutionService.updateTution(userId, tutionId, body)
    } catch (error) {
      return error.response
    }
  }

  @Get('/status')
  async getTutionByStatus(@Query('value') value, @Query('userId') userId) {
    try {
      return await this.tutionService.getTutionByStatus(value, userId)
      // return 'hello'
    } catch (error) {
      console.log(error)
      return error.response
    }
  }

}

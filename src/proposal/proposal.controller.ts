import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Put, Query } from '@nestjs/common';
import { ProposalService } from './proposal.service';
// import { CreateProposalDto } from './dto/create-proposal.dto';

@Controller('proposal')
export class ProposalController {

  constructor(private readonly proposalService: ProposalService) { }

  @Post('/post')
  create(@Body(ValidationPipe) body) {
    try {
      return this.proposalService.create(body)
    } catch (error) {
      return error.response
    }
  }

  @Get('/get/:id')
  getProposals(@Param('id') id) {
    try {
      return this.proposalService.getProposals(id)
    } catch (error) {
      return error.response
    }
  }


  @Put('/accept')
  acceptProposal(@Body() body) {
    try {
      return this.proposalService.acceptProposal(body)
    } catch (error) {
      return error.response
    }
  }

  @Put('/reject')
  rejectProposal(@Body() body) {
    try {
      return this.proposalService.rejectProposal(body)
    } catch (error) {
      return error.response
    }
  }

  @Put('/update')
  updateProposal(@Body() body, @Query('userId') userId, @Query('tutionId') tutionId) {
    try {
      return this.proposalService.updateProposal(userId, tutionId, body)
    } catch (error) {
      return error.response
    }
  }
  

  @Get('/status')
  async getProposalByStatus(@Query('value') value, @Query('userId') userId, @Query('tutionId') tutionId) {
     try {
      return await this.proposalService.getProposalByStatus(value, userId, tutionId)
      // return 'hello'
     } catch (error) {
      console.log(error)
      return error.response
     }
  }
  


}

import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, NotFoundException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { RegisterDTO } from './dto/register.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('/register')
  register(@Body(ValidationPipe) body: RegisterDTO) {
    try {
      return this.userService.register(body)
    } catch (error) {
      return error.response
    }
  }


  @Post('/login')
  async login(@Body(ValidationPipe) body, @Res() res: Response) {
    try {
      const data = await this.userService.login(body)
      if (data.statusCode) {
        throw new NotFoundException('Email or password is incorrect.')
      }
      else {
        const { token, user } = data

        res.cookie('jwt', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3000),
          sameSite: 'none',
          secure: true
        })

        res.send({ message: 'loggedin', statusCode: 200, user })
      }
    } catch (error) {
      throw new NotFoundException(error.response.message)
    }
  }

  @Get('/get')
  get(@Query('value') value, @Query('id') id) {
    try {
      return this.userService.get(value, id)
    } catch (error) {
      return error.response
    }
  }
  
}

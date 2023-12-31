import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDocument, UserModel } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(UserModel) private user: Model<UserDocument>,
    private jwtService: JwtService) {
    // console.log(category, account)
  }

  async register(body) {
    const user = await this.user.findOne({ email: body.email })
    if (user) {
      throw new NotFoundException("user already exsist")
    }
    else {
      const user = await this.user.create(body)
      return {
        message: 'User registered',
        statusCode: 200,
        user
      }
    }
  }

  async login(body) {
    try {
      try {
        var user = await this.user.findOne({ email: body.email })

      } catch (error) {
        console.log(error)
      }
      if (!user) {
        // console.log('1');
        throw new NotFoundException('User not found.')
      }

      const result = await bcrypt.compare(body.password, user.password)
      // console.log(result)

      if (!result) {
        //  console.log('2');
        throw new BadRequestException('Email or password is incorrect.')
      }

      else {
        const payload = { sub: user.password, username: user.name }
        const token = await this.jwtService.signAsync(payload)
        // console.log(token)
        return {
          token,
          user
        }
      }

    } catch (error) {
      // console.log(error)
      return error.response
    }
  }

  async get(value, id) {
    try {
      console.log(value)
      const user = await this.user.findById(id)
      if (user) {
        if (user.userType === 'admin') {
          const data = await this.user.find({ 'userType': value })
          if (data.length === 0) {
            throw new NotFoundException(`${value} Not found`)
          }
          else {
            return {
              message: 'total students',
              data,
              statusCode: 200
            }
          }
        }
        else {
          throw new UnauthorizedException('Only admin can access.')
        }
      }
      else {
        throw new NotFoundException('User not  found.')
      }
    } catch (error) {
      return error.response
    }
  }
}

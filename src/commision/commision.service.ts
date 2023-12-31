import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommisionDocument, CommisionModel } from './entities/commision.entity';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from 'src/user/entities/user.entity';

@Injectable()
export class CommisionService {

  constructor(
    @InjectModel(CommisionModel) private commision: Model<CommisionDocument>,
    @InjectModel(UserModel) private user: Model<UserDocument>
  ) { }



  async update(body) {
    try {
      const user = await this.user.findOne({ email: body.email })
      // console.log(user)
      if (user) {
        if (user.userType == 'admin') {
          const data = await this.commision.find()
          const { _id } = data[0]
          const newCommision = await this.commision.findByIdAndUpdate(_id, { percentage: body.percentage }, { new: true })

          return {
            message: 'Commision updated',
            statusCode: 200,
            newCommision
          }
        }
        else {
          throw new UnauthorizedException('Only admin can update commision.')
        }
      }
      else {
        throw new NotFoundException('User not found.')
      }
    } catch (error) {
      return error.response
    }
  }

  async sum(value, id) {
    try {
      console.log(value)
      const user = await this.user.findById(id)
      if (user) {
        if (user.userType === 'admin') {
          const data = await this.user.countDocuments({ 'userType': value })
          if (data) {
            return {
              message: `Total ${value} are ${data}`,
              // data
              statusCode: 200
            }
          }
          else {
            throw new NotFoundException(`${value} Not found`)
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

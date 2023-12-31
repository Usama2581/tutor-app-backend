import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TutionDocument, TutionModel } from './entities/tution.entity';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from '../user/entities/user.entity';
import { CommisionDocument, CommisionModel } from 'src/commision/entities/commision.entity';
import { ProposalDocument, ProposalModel } from 'src/proposal/entities/proposal.entity';


@Injectable()
export class TutionService {

  constructor(
    @InjectModel(UserModel) private user: Model<UserDocument>,
    @InjectModel(CommisionModel) private commision: Model<CommisionDocument>,
    @InjectModel(ProposalModel) private proposal: Model<ProposalDocument>,
    @InjectModel(TutionModel) private tution: Model<TutionDocument>) { }

  findUser(user) {
    try {
      return this.user.findOne({ _id: user })
    } catch (error) {
      return error.response
    }
  }


  async postTution(body) {
    try {
      const user = await this.findUser(body.user)

      if (user) {
        if (user.userType === 'student') {

          const commision = await this.commision.find()
          const newBody = { ...body, commision: commision[0].percentage }
          const tution = await this.tution.create(newBody)

          return {
            message: 'posted',
            statusCode: 200,
            tution
          }
        }
        else {
          throw new NotFoundException('only sudents can post tution')
        }
      }
      else {
        throw new NotFoundException('User not found.')
      }

    } catch (error) {
      return error.response
    }
  }

  async find() {
    try {
      const tution = await this.tution.find().populate('user')
      if (tution.length == 0) {
        throw new BadRequestException('Tutions not found.')
      }
      else {
        return tution
      }
    } catch (error) {
      return error.response
    }
  }

  async findUserTution(id) {
    try {
      const user = await this.findUser(id)
      if (user) {
        const tution = await this.tution.find({ user: id })
        if (tution.length === 0) {
          throw new ServiceUnavailableException('No tutions found.')
        }
        else {
          return tution
        }
      }
      else {
        throw new NotFoundException('User not found.')
      }
    } catch (error) {
      return error.response
    }
  }

  async findTutionIfProposalExsist(userId, tutionId) {
    console.log(userId);
    console.log(tutionId);

    try {
      const user = await this.user.findById({ _id: userId })
      if (user) {
        if (user.userType === 'student') {
          // throw new ServiceUnavailableException('you are student')
          const tution = await this.tution.findById({ _id: tutionId })
          if (tution) {
            const proposal = await this.proposal.find({ tution: tutionId })
            return proposal
          }
          else {
            throw new NotFoundException('tution doesnot exsist.')
          }
        }
        else {
          throw new ServiceUnavailableException('only students can access this.')
        }
      }
      else {
        throw new ServiceUnavailableException('user not found.')
      }
    } catch (error) {
      return error.response
    }
  }

  async updateTution(userId, tutionId, body) {
    try {
      const user = await this.user.findOne({ _id: userId })
      if (user) {
        if (user.userType === 'student') {
          const tution = await this.tution.findOne({ _id: tutionId })
          if (tution) {
            // throw new NotFoundException('tutin found')
            const result = await this.tution.findByIdAndUpdate({ _id: tution._id }, body, { new: true })
            return result
          }
          else {
            throw new NotFoundException('tutin not found')
          }
        }
        else {
          throw new NotFoundException('only student can access this.')
        }
      }
      else {
        throw new NotFoundException('user not found')
      }
    } catch (error) {
      return error.response
    }
  }

  async getTutionByStatus(value, userId) {
    console.log(userId)
    try {
      const user = await this.user.findOne({ _id: userId })

      if (user) {
        if (user.userType === 'admin') {

          const tution = await this.tution.aggregate([
            { $match: { 'status': value } },
          ])
          if (tution.length === 0) {
            throw new NotFoundException('Tution not found')
          }
          else {
            return {
              message: 'Tution found.',
              statusCode: 200,
              tution
            }
          }
        }
        else {
          throw new NotFoundException('Only admin can access this.')
        }
      }
      else {
        throw new NotFoundException('User not found.')
      }
    } catch (error) {
      console.log(error)

      return error.response
    }
  }

}

import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProposalDocument, ProposalModel } from './entities/proposal.entity';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from 'src/user/entities/user.entity';
import { TutionDocument, TutionModel } from 'src/tution/entities/tution.entity';
import e from 'express';

@Injectable()
export class ProposalService {

  constructor(
    @InjectModel(ProposalModel) private proposal: Model<ProposalDocument>,
    @InjectModel(UserModel) private user: Model<UserDocument>,
    @InjectModel(TutionModel) private tution: Model<TutionDocument>,
  ) { }


  async create(body) {
    try {
      const user = await this.user.findOne({ _id: body.user })
      if (user) {

        if (user.userType === 'teacher') {

          if (body.amount >= 0) {

            const tution = await this.tution.findOne({ _id: body.tution })
            const proposal = await this.proposal.findOne({
              $and:
                [{ user: { $eq: body.user } },
                { tution: { $eq: body.tution } }]
            })
            if (tution) {
              if (!proposal) {
                const newProposal = await this.proposal.create(body)

                return {
                  message: 'Proposal submitted.',
                  statusCode: 200,
                  proposal: newProposal
                }
              }
              else {
                throw new ServiceUnavailableException('you cannot apply again.')
              }
            }
            else {
              throw new NotFoundException('Tution does not exsist.')
            }

          }
          else {
            throw new ServiceUnavailableException(`Invalid amount ${body.amount}`)
          }
        }
        else {
          throw new ServiceUnavailableException('Only teachers can add proposal.')
        }
      }
      else {
        throw new NotFoundException('User not found.')
      }
    } catch (error) {
      return error.response
    }
  }


  async getProposals(id) {
    try {

      const tution = await this.tution.findById(id)

      if (tution) {
        const proposal = await this.proposal.find({ tution: id })
        if (proposal.length === 0) {
          throw new BadRequestException('No proposals found.')
        }
        else {
          return proposal
        }
      }
      else {
        throw new NotFoundException('Tution not found.')
      }

      // return await this.proposal.find({ tution: id })
    } catch (error) {
      return error.response
    }
  }


  async acceptProposal(body) {
    try {
      const student = await this.user.findOne({ _id: body.studentId })
      if (student) {
        const teacher = await this.user.findOne({ _id: body.teacherId })
        if (teacher) {
          const tution = await this.tution.findOne({ _id: body.tution })
          if (tution) {
            // return tution
            const proposal = await this.proposal.findOne({ tution: body.tution, user: body.teacherId })
            if (proposal) {
              const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, { status: 'accepted' }, { new: true })
              return newProposal
            }
            else {
              throw new NotFoundException('Proposal not found.')
            }
          }
          else {
            throw new NotFoundException('Tution not found.')
          }
        }
        else {
          throw new NotFoundException('Teacher not found')
        }
      }
      else {
        throw new NotFoundException('Student not found')
      }
    } catch (error) {
      return error.response
    }
  }


  async rejectProposal(body) {
    try {
      const student = await this.user.findOne({ _id: body.studentId })
      if (student) {
        const teacher = await this.user.findOne({ _id: body.teacherId })
        if (teacher) {
          const tution = await this.tution.findOne({ _id: body.tution })
          if (tution) {
            // return tution
            const proposal = await this.proposal.findOne({ tution: body.tution, user: body.teacherId })
            if (proposal) {
              const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, { status: 'rejected' }, { new: true })
              return {
                message: 'Proposal rejected',
                statusCode: 200,
                newProposal
              }
            }
            else {
              throw new NotFoundException('Proposal not found.')
            }
          }
          else {
            throw new NotFoundException('Tution not found.')
          }
        }
        else {
          throw new NotFoundException('Teacher not found')
        }
      }
      else {
        throw new NotFoundException('Student not found')
      }
    } catch (error) {
      return error.response
    }
  }


  async updateProposal(userId, tutionId, body) {
    try {
      const user = await this.user.findOne({ _id: userId })
      if (user) {
        if (user.userType === 'teacher') {
          const tution = await this.tution.findOne({ _id: tutionId })
          if (tution) {
            // throw new NotFoundException("Tution found.")
            const proposal = await this.proposal.findOne({ tution: tutionId, user: userId })

            if (proposal) {
              // throw new NotFoundException('Your proposal found')
              const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, body, { new: true })
              return {
                message: 'Proposal updated',
                statusCode: 200,
                newProposal
              }
            }
            else {
              throw new NotFoundException('Your proposal not found')
            }
          }
          else {
            throw new NotFoundException("Tution not found.")
          }
        }
        else {
          throw new NotFoundException("Only teachers can write and update proposals.")
        }
      }
      else {
        throw new NotFoundException("User not found.")

      }
    } catch (error) {
      return error.response
    }
  }

  async getProposalByStatus(value, userId, tutionId) {
    console.log(userId)
    try {
      // const user = await this.user.findOne({ _id: userId })
      const user = await this.user.findOne({ _id: userId })
      // return user
      if (user) {
        if (user.userType === 'admin') {
          const tution = await this.tution.findOne({ _id: tutionId })
          // return tution
          if (tution) {
            const proposals = await this.proposal.aggregate([
              { $match: { 'status': value } },
              { $match: { 'tution': tutionId } }
            ])
            
            if (proposals.length === 0) {
              throw new NotFoundException('proposals not found')
            }
            else {
              return {
                statusCode: 200,
                message: 'Proposals found',
                proposals
              }
            }
          }
          else {
            throw new NotFoundException('Tution not found.')
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


import { Module } from '@nestjs/common';
import { TutionService } from './tution.service';
import { TutionController } from './tution.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TutionModel, TutionSchema } from './entities/tution.entity';
import { UserModel, UserSchema } from 'src/user/entities/user.entity';
import { CommisionModel, CommisionSchema } from 'src/commision/entities/commision.entity';
import { ProposalModel, ProposalSchema } from 'src/proposal/entities/proposal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TutionModel, schema: TutionSchema }]),
    MongooseModule.forFeature([{ name: CommisionModel, schema: CommisionSchema }]),
    MongooseModule.forFeature([{ name: ProposalModel, schema: ProposalSchema }]),
    MongooseModule.forFeature([{ name: UserModel, schema: UserSchema }]),
  ],
  controllers: [TutionController],
  providers: [TutionService],
})
export class TutionModule { }

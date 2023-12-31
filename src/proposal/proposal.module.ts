import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { ProposalModel, ProposalSchema } from './entities/proposal.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/user/entities/user.entity';
import { TutionModel, TutionSchema } from 'src/tution/entities/tution.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProposalModel, schema: ProposalSchema }]),
    MongooseModule.forFeature([{ name: UserModel, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TutionModel, schema: TutionSchema }]),
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule { }

import { Module } from '@nestjs/common';
import { CommisionService } from './commision.service';
import { CommisionController } from './commision.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommisionModel, CommisionSchema } from './entities/commision.entity';
import { UserModel, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommisionModel, schema: CommisionSchema }]),
    MongooseModule.forFeature([{ name: UserModel, schema: UserSchema }])
  ],
  controllers: [CommisionController],
  providers: [CommisionService],
})

export class CommisionModule { }

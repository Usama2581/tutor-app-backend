import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({ 
  imports: [
    MongooseModule.forFeature([{ name: UserModel, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'key',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }

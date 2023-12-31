import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TutionModule } from './tution/tution.module';
import { ProposalModule } from './proposal/proposal.module';
import { CommisionModule } from './commision/commision.module';
import { StripeModule } from './stripe/stripe.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DBModule,
    UserModule,
    TutionModule,
    ProposalModule,
    CommisionModule,
    StripeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

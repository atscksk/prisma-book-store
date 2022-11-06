import { BookModule } from './book.module';
import { UserModule } from './user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from 'src/controller/app.controller';
import { AppService } from 'src/service/app.service';

@Module({
  imports: [PrismaModule, UserModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

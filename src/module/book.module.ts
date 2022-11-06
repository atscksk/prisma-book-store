import { UserModule } from './user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { BookController } from 'src/controller/book.controller';
import { BookService } from 'src/service/book.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BookService } from 'src/service/book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@Query('page', ParseIntPipe) page) {
    return this.bookService.getBooks(page);
  }

  @Post('faker')
  createFakeBooks() {
    return this.bookService.createFakeBooks();
  }

  @Get('review/:bookId')
  getBookReview(@Param('bookId') book_id) {
    return this.bookService.getBookReview(Number(book_id));
  }

  @Post('review/:bookId')
  createBookReview(@Body() body, @Param('bookId') book_id) {
    return this.bookService.createBookReview(body, Number(book_id));
  }

  @Delete()
  deleteBook(@Body('bookId') book_id) {
    return this.bookService.deleteBook(Number(book_id));
  }

  @Post()
  createBook() {
    return this.bookService.createBook();
  }

  @Get('search')
  searchBooks(@Query('name') name) {
    return this.bookService.searchBooks(name);
  }

  @Get('category')
  getCategories() {
    return this.bookService.getCategories();
  }

  @Post('category')
  createCategory(@Body('name') name) {
    return this.bookService.createCategory(name);
  }
}

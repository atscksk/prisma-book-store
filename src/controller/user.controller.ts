import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from 'src/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query('page', ParseIntPipe) page) {
    return this.userService.getUsers(page);
  }

  @Post('faker')
  createFakerUsers() {
    return this.userService.createFakerUsers();
  }

  @Post()
  createUser(@Body() body) {
    return this.userService.createUser(body);
  }

  @Delete()
  deleteUser(@Body('user_id', ParseIntPipe) user_id) {
    return this.userService.deleteUser(user_id);
  }

  @Get('card/:userId')
  getMyCartList(@Param('userId', ParseIntPipe) user_id) {
    return this.userService.getMyCartList(user_id);
  }

  @Post('cart')
  addBookToMyCart(@Body() body) {
    return this.userService.addBookToMyCart(body);
  }

  @Get('order/:userId')
  getOrderList(@Param('userId', ParseIntPipe) user_id) {
    return this.userService.getOrderList(user_id);
  }

  @Post('order/:userId')
  orderBook(@Body() body, @Param('userId', ParseIntPipe) user_id) {
    return this.userService.orderBook(body, user_id);
  }
}

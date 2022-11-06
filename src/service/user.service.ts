import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(page = 1) {
    return await this.prisma.user.findMany({
      take: 30,
      skip: 30 * (page - 1),
      orderBy: {
        user_id: 'desc',
      },
      select: {
        email: true,
        user_info: {
          select: {
            user_info_id: true,
            user_id: true,
          },
        },
      },
    });
  }

  async createFakerUsers() {
    const data = new Array(1000).fill(0).map(() => {
      return this.prisma.user.create({
        data: {
          email: faker.internet.email(),
          user_info: {
            create: {
              password: faker.datatype.uuid(),
            },
          },
        },
      });
    });
    const arr = await Promise.all(data);
    return arr.length;
  }

  async createUser(payload) {
    return await this.prisma.user.create({
      data: {
        email: payload.email,
        user_info: {
          create: {
            password: payload.password,
          },
        },
      },
    });
  }

  async deleteUser(user_id) {
    return await this.prisma.user.delete({
      where: {
        user_id,
      },
    });
  }

  async getMyCartList(user_id) {
    return await this.prisma.cart.findMany({
      where: {
        user_id,
      },
      include: {
        book: true,
      },
    });
  }

  async addBookToMyCart(payload) {
    return await this.prisma.cart.create({
      data: {
        user_id: Number(payload.user_id),
        book_id: Number(payload.book_id),
      },
    });
  }

  async getOrderList(user_id) {
    return await this.prisma.order.findMany({
      where: {
        user_id,
      },
      include: {
        order_infos: true,
      },
    });
  }

  async orderBook(payload, user_id) {
    const { order_id } = await this.prisma.order.create({
      data: {
        user_id,
        payment_id: faker.datatype.uuid(),
      },
    });
    const data = payload.book_id.split(',').map((book_id) => ({
      order_id,
      book_id: Number(book_id),
      amount: 1,
    }));
    const newOrderInfo = await this.prisma.orderInfo.createMany({
      data,
    });
    return newOrderInfo;
  }
}

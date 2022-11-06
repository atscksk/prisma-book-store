import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getBooks(page = 1) {
    return await this.prisma.book.findMany({
      take: 30,
      skip: 30 * (page - 1),
      orderBy: {
        book_id: 'desc',
      },
    });
  }

  async createFakeBooks() {
    const data = new Array(100000).fill(0).map(() => ({
      title: faker.lorem.lines().slice(0, 40),
      publisher: faker.company.bs().slice(0, 20),
      author: faker.internet.userName().slice(0, 10),
      price: Math.ceil(Math.random() * 20) * 1000 + 1000,
    }));
    return await this.prisma.book.createMany({
      data,
    });
  }

  async getBookReview(book_id) {
    return await this.prisma.review.findMany({
      where: {
        book_id,
      },
      include: {
        user: true,
      },
    });
  }

  async createBookReview(payload, book_id) {
    return await this.prisma.review.create({
      data: {
        user_id: Number(payload.user_id),
        book_id,
        content: payload.content,
        rating:
          Number(payload.rating) > 5
            ? 5
            : Number(payload.rating) < 0
            ? 0
            : Number(payload.rating),
      },
    });
  }

  async deleteBook(book_id) {
    return await this.prisma.book.delete({
      where: {
        book_id,
      },
    });
  }

  async createBook() {
    return await this.prisma.book.create({
      data: {
        title: 'title test',
        publisher: 'pub test',
        author: 'auth test',
        price: 10000,
        category: {
          connect: { category_id: 14 },
        },
      },
      include: {
        category: true,
      },
    });
  }

  async searchBooks(name) {
    return this.prisma.book.findMany({
      where: {
        title: {
          search: `${name} & aliquid`,
        },
      },
    });
  }

  async getCategories() {
    return await this.prisma.category.findMany({
      include: {
        books: true,
      },
    });
  }

  async createCategory(name) {
    return await this.prisma.category.create({
      data: {
        name,
        books: {
          connect: [
            {
              book_id: 11000,
            },
            {
              book_id: 11001,
            },
          ],
        },
      },
    });
  }
}

import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectClient } from 'nest-mongodb-driver';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class ProductService {
  constructor(@InjectClient() private readonly db: Db) {}

  async findAll() {
    return await this.db.collection('products').find().toArray();
  }

  async findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const result = await this.db.collection('products').findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async create(createUserDto: CreateProductDTO) {
    try {
      return await this.db.collection('products').insertOne(createUserDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateProductDTO) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    try {
      const result = this.db.collection('products').updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...updateUserDto,
          },
        },
      );

      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const result = await this.db.collection('products').deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}

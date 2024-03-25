import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create-product')
  create(@Body() createUserDto: CreateProductDTO) {
    return this.productService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put('/update-product/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateProductDTO) {
    return this.productService.update(id, updateUserDto);
  }

  @Delete('/delete-product/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

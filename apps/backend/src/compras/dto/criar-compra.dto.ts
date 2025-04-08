import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ItemCompraDto {
  @IsString()
  @IsNotEmpty()
  produtoId: string;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsNumber()
  @IsNotEmpty()
  precoUnitario: number;
}

export class CriarCompraDto {
  @IsString()
  @IsNotEmpty()
  clienteId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemCompraDto)
  itens: ItemCompraDto[];
}

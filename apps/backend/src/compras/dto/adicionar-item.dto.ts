import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class AdicionarItemDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  produtoId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantidade: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  valorUnitario: number;
}

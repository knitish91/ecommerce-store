import { IsString, IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

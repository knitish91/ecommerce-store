import { IsString, IsOptional } from 'class-validator';

export class CheckoutDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  discountCode?: string;
}
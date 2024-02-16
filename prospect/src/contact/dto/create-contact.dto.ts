import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { TypeEnum } from 'src/common/type.enum';
export class CreateContactDto {
  @ApiProperty({ description: ' email' })
  @IsNotEmpty()
  prospectId: string;

  @ApiProperty({ description: ' email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'telNo' })
  @IsNotEmpty()
  telNo: number;

  @ApiProperty({ description: 'type' })
  @IsNotEmpty()
  type: TypeEnum;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TypeEnum } from 'src/common/type.enum';
export class CreateProspectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Prospect Name cannot be empty' })
  prospectName: string;

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

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProspectDto } from './create-prospect.dto';
import { TypeEnum } from 'src/common/type.enum';

export class UpdateProspectDto extends PartialType(CreateProspectDto) {
  @ApiProperty({ description: 'status' })
  status: TypeEnum;

  @ApiProperty({ description: 'active' })
  active: boolean;
}

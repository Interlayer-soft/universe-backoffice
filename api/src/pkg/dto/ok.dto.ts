import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OkResponse {
  @Expose()
  @ApiProperty()
  ok: boolean;

  constructor(ok: boolean) {
    this.ok = ok;
  }
}

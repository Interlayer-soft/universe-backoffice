import { Expose, Type } from 'class-transformer';

export class ByAdminDto {
  @Expose()
  id: string;

  @Expose()
  username: string;
}

export class RetrieveAdminResponse {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => ByAdminDto)
  createdBy: ByAdminDto;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ByAdminDto)
  updatedBy: ByAdminDto;

  constructor(partial: Partial<RetrieveAdminResponse>) {
    Object.assign(this, partial);
  }
}

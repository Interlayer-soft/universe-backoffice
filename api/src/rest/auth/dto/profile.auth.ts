import { Expose } from 'class-transformer';

export class ProfileResponse {
  @Expose()
  id: string;

  @Expose()
  username: string;

  constructor(partial: Partial<ProfileResponse>) {
    Object.assign(this, partial);
  }
}

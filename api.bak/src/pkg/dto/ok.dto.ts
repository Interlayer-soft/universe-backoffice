import { Expose } from 'class-transformer';

export class OkResponse {
  @Expose()
  ok: boolean;

  constructor(ok: boolean) {
    this.ok = ok;
  }
}

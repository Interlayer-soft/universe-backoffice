import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CursorPaginationQuery {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  take = 10;

  @IsString()
  @IsOptional()
  cursor?: string;
}

export class CursorPaginationResponse<T> {
  _items: T[];

  @Expose()
  get items() {
    return this._items.slice(0, this.take);
  }

  @ApiProperty({
    type: 'object',
    properties: {
      take: {
        type: 'number',
      },
      cursor: {
        type: 'string',
      },
      nextId: {
        type: 'string',
      },
    },
  })
  @Expose()
  get meta() {
    return {
      take: this.take,
      cursor: this._items.length > 0 ? (this._items[0] as any).id : null,
      nextId:
        this._items.length > this.take
          ? (this._items[this.take] as any).id
          : null,
    };
  }

  take: number;

  constructor(items: T[], take: number) {
    this._items = items;
    this.take = take;
  }
}

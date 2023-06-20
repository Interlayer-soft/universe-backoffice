import { CursorPaginationResponse } from '../dto/cursor-pagination.dto';

import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiOkResponsePaginated = <ItemsDto extends Type<unknown>>(
  itemsDto: ItemsDto,
) =>
  applyDecorators(
    ApiExtraModels(CursorPaginationResponse, itemsDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CursorPaginationResponse) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(itemsDto) },
              },
            },
          },
        ],
      },
    }),
  );

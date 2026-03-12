import { ApiProperty } from '@nestjs/swagger';

export class GetEventsDto {
  @ApiProperty({
    required: false,
    example: 'React',
    description: 'Title search term',
  })
  search?: string;

  @ApiProperty({ required: false, example: 1, default: 1 })
  page?: number;

  @ApiProperty({ required: false, example: 6, default: 6 })
  limit?: number;
}

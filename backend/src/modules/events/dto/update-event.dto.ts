import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({ example: 'React Meetup Kyiv', required: false })
  title?: string;

  @ApiProperty({
    example: 'Monthly React developers meetup in Kyiv',
    required: false,
  })
  description?: string;

  @ApiProperty({ example: '2026-04-15T18:00:00.000Z', required: false })
  date?: string;

  @ApiProperty({ example: 'Kyiv, Hub One', required: false })
  location?: string;

  @ApiProperty({ example: 50, required: false, nullable: true })
  capacity?: number | null;

  @ApiProperty({ example: true, required: false })
  isPublic?: boolean;
}

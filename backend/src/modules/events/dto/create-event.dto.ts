import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'React Meetup Kyiv' })
  title: string;

  @ApiProperty({ example: 'Monthly React developers meetup in Kyiv' })
  description: string;

  @ApiProperty({ example: '2026-04-15T18:00:00.000Z' })
  date: string;

  @ApiProperty({ example: 'Kyiv, Hub One' })
  location: string;

  @ApiProperty({ example: 50, required: false, nullable: true })
  capacity?: number | null;

  @ApiProperty({ example: true, required: false, default: true })
  isPublic?: boolean;
}

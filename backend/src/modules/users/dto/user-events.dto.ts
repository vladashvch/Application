import { ApiProperty } from '@nestjs/swagger';

export type CalendarView = 'monthly' | 'weekly';

export class UserEventsDto {
  @ApiProperty({ enum: ['monthly', 'weekly'], example: 'monthly' })
  view: CalendarView;

  @ApiProperty({
    example: '2025-04-15',
    description:
      'Reference date in ISO 8601 format (YYYY-MM-DD). Defaults to today.',
    required: false,
  })
  date?: string;
}

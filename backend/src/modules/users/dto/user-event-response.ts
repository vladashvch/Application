import { ApiProperty } from '@nestjs/swagger';

export class UserEventResponse {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  id: string;

  @ApiProperty({ example: 'Team standup' })
  title: string;

  @ApiProperty({
    example: '2025-04-15',
    description: 'Event start date and time (ISO 8601)',
  })
  date: Date;

  @ApiProperty({ example: 'Monthly React developers meetup in Kyiv' })
  description: string;

  @ApiProperty({ example: 'Kyiv, Hub One' })
  location: string;

  @ApiProperty({ example: 50 })
  capacity?: number | null;

  @ApiProperty({ example: 'Alice Johnson', nullable: true })
  organizer_name?: string | null;

  @ApiProperty({ example: true })
  isOrganizer: boolean;
}

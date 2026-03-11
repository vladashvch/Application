import { ApiProperty } from '@nestjs/swagger';

export class EventResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  id: string;

  @ApiProperty({ example: 'React Meetup Kyiv' })
  title: string;

  @ApiProperty({ example: 'Monthly React developers meetup in Kyiv' })
  description: string;

  @ApiProperty({ example: '2025-04-15T18:00:00.000Z' })
  date: Date;

  @ApiProperty({ example: 'Kyiv, Hub One' })
  location: string;

  @ApiProperty({ example: 50, nullable: true })
  capacity: number | null;

  @ApiProperty({ example: true })
  isPublic: boolean;

  @ApiProperty({ example: '2026-03-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: 'Alice Johnson' })
  organizer: string;

  @ApiProperty({ example: 12 })
  participantCount: number;

  @ApiProperty({ example: false })
  isOrganizer: boolean;

  @ApiProperty({ example: false })
  isParticipant: boolean;

  @ApiProperty({ example: ['Bob Smith', 'Charlie Brown'] })
  participants: string[];
}

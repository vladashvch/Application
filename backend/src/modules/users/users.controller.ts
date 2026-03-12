import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEventsDto, UserEventResponse } from './dto';
import { userEventsQuerySchema } from './schemas';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { YupValidationPipe } from '../../common/pipes/yup-validation.pipe';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/events')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Fetch authenticated user's events (calendar)" })
  @ApiQuery({
    name: 'view',
    enum: ['monthly', 'weekly'],
    required: true,
    description: 'Calendar view type',
  })
  @ApiQuery({
    name: 'date',
    type: String,
    required: false,
    description: 'Reference date in YYYY-MM-DD format. Defaults to today.',
    example: '2025-04-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns events within the selected period',
    type: [UserEventResponse],
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMyEvents(
    @CurrentUser('id') userId: string,
    @Query(new YupValidationPipe(userEventsQuerySchema))
    query: UserEventsDto,
  ): Promise<UserEventResponse[]> {
    return this.usersService.getMyEvents(userId, query);
  }
}

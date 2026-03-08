import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ERROR_MESSAGES } from '../../common/error-messages';
import { JwtAuthGuard } from '../../common/guards';
import { YupValidationPipe } from '../../common/pipes/yup-validation.pipe';
import { CreateEventDto, EventResponseDto, UpdateEventDto } from './dto';
import { createEventSchema, updateEventSchema } from './schemas';
import { EventsService } from './events.service';
import { SuccessResponseDto } from 'src/common/dto';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all public events' })
  @ApiResponse({ status: 200, type: [EventResponseDto] })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  findAll(@CurrentUser('id') userId: string): Promise<EventResponseDto[]> {
    return this.eventsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a single event by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: EventResponseDto })
  @ApiResponse({ status: 404, description: ERROR_MESSAGES.NOT_FOUND })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  findOne(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<EventResponseDto> {
    return this.eventsService.findOne(id, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ status: 201, type: EventResponseDto })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  create(
    @CurrentUser('id') userId: string,
    @Body(new YupValidationPipe(createEventSchema)) dto: CreateEventDto,
  ): Promise<EventResponseDto> {
    return this.eventsService.create(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit event details (organizer only)' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({ status: 200, type: EventResponseDto })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  @ApiResponse({ status: 403, description: ERROR_MESSAGES.FORBIDDEN })
  @ApiResponse({ status: 404, description: ERROR_MESSAGES.NOT_FOUND })
  update(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body(new YupValidationPipe(updateEventSchema)) dto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    return this.eventsService.update(id, userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete event (organizer only)' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  @ApiResponse({ status: 403, description: ERROR_MESSAGES.FORBIDDEN })
  @ApiResponse({ status: 404, description: ERROR_MESSAGES.NOT_FOUND })
  remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<SuccessResponseDto> {
    return this.eventsService.remove(id, userId);
  }

  @Post(':id/join')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Join an event as a participant' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  @ApiResponse({ status: 404, description: ERROR_MESSAGES.NOT_FOUND })
  @ApiResponse({ status: 409, description: ERROR_MESSAGES.ALREADY_JOINED })
  @ApiResponse({ status: 409, description: ERROR_MESSAGES.EVENT_FULL })
  async join(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<SuccessResponseDto> {
    const result: SuccessResponseDto = await this.eventsService.join(
      id,
      userId,
    );
    return result;
  }

  @Post(':id/leave')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Leave an event' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  @ApiResponse({ status: 404, description: ERROR_MESSAGES.NOT_FOUND })
  @ApiResponse({ status: 404, description: ERROR_MESSAGES.NOT_A_PARTICIPANT })
  async leave(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<SuccessResponseDto> {
    const result: SuccessResponseDto = await this.eventsService.leave(
      id,
      userId,
    );
    return result;
  }
}

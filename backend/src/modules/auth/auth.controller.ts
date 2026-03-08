import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthResponseDto,
  LoginAuthDto,
  LogoutResponseDto,
  RegisterAuthDto,
} from './dto';
import { JwtAuthGuard, JwtRefreshAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../common/error-messages';
import { YupValidationPipe } from 'src/common/pipes/yup-validation.pipe';
import { loginSchema, registerSchema } from './schemas';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterAuthDto })
  @ApiResponse({ status: 201, description: 'User registered' })
  @ApiResponse({ status: 409, description: ERROR_MESSAGES.EMAIL_TAKEN })
  register(
    @Body(new YupValidationPipe(registerSchema)) dto: RegisterAuthDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Returns access and refresh tokens',
  })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  login(
    @Body(new YupValidationPipe(loginSchema)) dto: LoginAuthDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshAuthGuard)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Returns new access token' })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  refresh(
    @CurrentUser('id') userId: string,
  ): Promise<Partial<AuthResponseDto>> {
    return this.authService.refresh(userId);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout user (invalidate refresh token)' })
  @ApiResponse({ status: 200, description: 'Success flag' })
  @ApiResponse({ status: 401, description: ERROR_MESSAGES.INVALID_CREDENTIALS })
  logout(@CurrentUser('id') userId: string): Promise<LogoutResponseDto> {
    return this.authService.logout(userId);
  }
}

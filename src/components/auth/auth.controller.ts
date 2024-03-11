import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

import UsersService from '@components/users/users.service';
import { User } from '@components/users/schema/user.schema';

import OkResponseDto from '@dto/okResponse.dto';
import { IAuthLoginOutput } from './interfaces/IAuthLoginOutput.interface';
import LocalAuthGuard from './guards/localAuth.guard';
import AuthService from './auth.service';
import RefreshTokenDto from './dto/refreshToken.dto';
import SignInDto from './dto/signIn.dto';
import SignUpDto from './dto/signUp.dto';
import VerifyUserDto from './dto/verifyUser.dto';
import JwtAuthGuard from './guards/jwtAuth.guard';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: 'Returns jwt tokens' })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError' })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({ description: '200, Success' })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError' })
  @Post('sign-up')
  async signUp(@Body() user: SignUpDto): Promise<OkResponseDto> {
    await this.usersService.create(user);

    return {
      message: 'The item was created successfully',
    };
  }

  @ApiOkResponse({ description: '200, returns new jwt tokens' })
  @ApiUnauthorizedResponse({ description: '401. Token has been expired' })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError ' })
  @ApiBearerAuth()
  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<IAuthLoginOutput | never> {
    const verifiedUser = this.jwtService.verify(refreshTokenDto.refreshToken);

    const oldRefreshToken: string =
      await this.authService.getRefreshTokenByEmail(verifiedUser.email);

    if (!oldRefreshToken || oldRefreshToken !== refreshTokenDto.refreshToken) {
      throw new UnauthorizedException(
        'Authentication credentials were missing or incorrect',
      );
    }

    const payload = {
      id: verifiedUser.id,
      email: verifiedUser.email,
    };

    const newTokens = await this.authService.login(payload);

    return newTokens;
  }

  @ApiOkResponse({
    type: OkResponseDto,
    description: 'User was successfully verified',
  })
  @ApiNotFoundResponse({
    description: 'User was not found',
  })
  @Post('verify')
  async verifyUser(
    @Body() verifyUserDto: VerifyUserDto,
  ): Promise<boolean | never> {
    const foundUser: User = await this.usersService.getByEmail(
      verifyUserDto.email,
      false,
    );

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    await this.usersService.update(foundUser._id, { verified: true });

    return true;
  }
}

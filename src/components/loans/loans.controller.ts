import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import JwtAuthGuard from '@components/auth/guards/jwtAuth.guard';
import { RoleType } from 'src/constants/role-type';
import { RolesGuard } from '@guards/role.guard';
import { CreateLoanDto } from './dto/create-loan.dto';
import { LoansService } from './loans.service';

@Controller('loans')
@ApiBearerAuth()
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: CreateLoanDto })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [RoleType.ADMIN, RoleType.USER])
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [RoleType.ADMIN])
  findAll() {
    return this.loansService.findAll();
  }
}

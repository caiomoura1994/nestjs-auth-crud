import { Controller, Get, Post, Body } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantDto } from './dto/tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() tenantDto: TenantDto) {
    return this.tenantsService.create(tenantDto);
  }

  @Post('/migrate')
  migrate(@Body() tenantDto: TenantDto) {
    return this.tenantsService.migrate(tenantDto.id);
  }

  @Post('/revert')
  revert(@Body() tenantDto: TenantDto) {
    return this.tenantsService.revert(tenantDto.id);
  }

  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }
}

import { Controller, Get } from '@nestjs/common';
import { SnmpService } from './snmp.service';

@Controller('snmp')
export class SnmpController {
  constructor(private readonly snmpService: SnmpService) {}

  @Get('trafego')
  async getTrafego() {
    const value = await this.snmpService.getIfInOctets();
    const time = new Date().toISOString();
    return { time, bytes: value };
  }

  @Get('teste')
  async getTeste() {
    const value = Math.floor(Math.random() * 10000) + 5000;
    const time = new Date().toISOString();
    return { time, bytes: value };
  }

  
}

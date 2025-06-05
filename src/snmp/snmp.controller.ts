import { Controller, Get, Query } from '@nestjs/common';
import { SnmpService } from './snmp.service';

@Controller('snmp')
export class SnmpController {
  constructor(private readonly snmpService: SnmpService) {}

  @Get('trafego')
  async getTrafego(
    @Query('rxPorta') rxPorta: string,
    @Query('txPorta') txPorta: string,
  ) {
    console.log(`rxPorta: ${rxPorta}, txPorta: ${txPorta}`);
    const values = await this.snmpService.getValues(rxPorta, txPorta);
    const time = new Date().toISOString();
    return { time, valores: values};
  }

  @Get('teste')
  async getTeste() {
    const value = Math.floor(Math.random() * 10000) + 5000;
    const time = new Date().toISOString();
    return { time, bytes: value };
  }

  
}

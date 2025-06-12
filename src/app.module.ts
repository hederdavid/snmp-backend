import { Module } from '@nestjs/common';
import { SnmpModule } from './snmp/snmp.module';

@Module({
  imports: [SnmpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Injectable, Logger } from '@nestjs/common';
import * as snmp from 'net-snmp';

@Injectable()
export class SnmpService {
  private readonly logger = new Logger(SnmpService.name);
  private session: snmp.Session;
  private readonly target = '10.4.22.1'; // IP Mikrotik
  private readonly community = 'public';
  private readonly oid = '1.3.6.1.2.1.2.2.1.10.2'; // ifInOctets interface 2

  constructor() {
    this.session = snmp.createSession(this.target, this.community);
  }

  async getIfInOctets(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.session.get([this.oid], (error, varbinds) => {
        if (error) {
          this.logger.error('Erro SNMP: ' + error.message);
          return reject(error);
        }
        if (varbinds && varbinds.length > 0) {
          const value = varbinds[0].value as number;
          this.logger.log(`SNMP Value: ${value}`);
          resolve(value);
        } else {
          reject(new Error('No varbinds'));
        }
      });
    });
  }
}

import { Injectable, Logger } from '@nestjs/common';
import * as snmp from 'net-snmp';

@Injectable()
export class SnmpService {
  private readonly logger = new Logger(SnmpService.name);
  private session: snmp.Session;
  private readonly target = '10.4.22.200'; // IP Mikrotik
  private readonly community = 'public';
  private readonly oidRx = '1.3.6.1.2.1.2.2.1.10.'; // ifInOctets interface 2
  private readonly oidTx = '1.3.6.1.2.1.2.2.1.16.';

  constructor() {
    this.session = snmp.createSession(this.target, this.community);
  }

  async getValues(portaRx: string, portaTx: string) {
    const valueRxBytes = await this.getRxBytes(portaRx);
    const valueTxBytes = await this.getTxBytes(portaTx);
    return {rxBytes : valueRxBytes, txBytes: valueTxBytes};
  }

  async getRxBytes(porta: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.session.get([this.oidRx + porta], (error, varbinds) => {
        if (error) {
          this.logger.error('Erro SNMP: ' + error.message);
          return reject(error);
        }
        if (varbinds && varbinds.length > 0) {
          const value = varbinds[0].value as number;
          this.logger.log(`RX Value: ${value}`);
          resolve(value);
        } else {
          reject(new Error('No varbinds'));
        }
      });
    });
  }

  async getTxBytes(porta: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.session.get([this.oidTx + porta], (error, varbinds) => {
        if (error) {
          this.logger.error('Erro SNMP: ' + error.message);
          return reject(error);
        }
        if (varbinds && varbinds.length > 0) {
          const value = varbinds[0].value as number;
          this.logger.log(`TX Value: ${value}`);
          resolve(value);
        } else {
          reject(new Error('No varbinds'));
        }
      });
    });
  }
}

import { Controller, Get } from '@nestjs/common';
import moment from 'moment';

@Controller('api/status')
export class StatusController {
  private readonly startupTime: Date;

  constructor() {
    this.startupTime = new Date();
  }

  @Get()
  getStatusReport() {
    return {
      application: 'Hemera',
      description: 'Project service for the Octape Platform.',
      uptimeHuman: moment(this.startupTime).fromNow(),
      uptime: moment().diff(moment(this.startupTime)),
      version: 'develop',
    };
  }
}

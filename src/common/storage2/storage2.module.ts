import { Module } from '@nestjs/common';
import { Storage2Service } from './storage2.service';

@Module({
  providers: [Storage2Service]
  ,
  exports: [
    Storage2Service
  ]
})
export class Storage2Module { }

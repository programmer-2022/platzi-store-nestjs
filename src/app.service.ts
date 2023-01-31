import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

import config from './environments/config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('MONGO') private mongoDB: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  async test() {
    // const tasksCollection = await this.mongoDB.collection('tasks');
    // console.log(tasksCollection);
    // const tasks = await tasksCollection.find().toArray();
    // return tasks;
    return "hola";
  }
}

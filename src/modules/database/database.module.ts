import { HttpModule, HttpService } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { catchError, lastValueFrom } from 'rxjs';
import config from '../../environments/config';

const API_KEY_DEV = 'api_dev';
const API_KEY_PROD = 'api_prod';

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        console.log(config);
        const { connection, user, password, host, port, dbName } =
          configService.mongo;

        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_DEV,
    },
    // {
    //   provide: 'MONGO',
    //   useFactory: async (configService: ConfigType<typeof config>) => {
    //     console.log(config);
    //     const { connection, user, password, host, port, dbName } =
    //       configService.mongo;
    //     const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin`;
    //     const client = new MongoClient(uri);
    //     await client.connect();
    //     const database = client.db(dbName);
    //     return database;
    //   },
    //   inject: [config.KEY],
    // },
    // {
    //   provide: 'TASKS',
    //   useFactory: async (httpService: HttpService) => {
    //     const { data } = await lastValueFrom(
    //       httpService.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
    //         catchError((error) => {
    //           throw `Error en la peticion http ${error}`;
    //         }),
    //       ),
    //     );
    //   },
    //   inject: [HttpService],
    // },
  ],
  exports: ['API_KEY', MongooseModule],
})
export class DatabaseModule {}

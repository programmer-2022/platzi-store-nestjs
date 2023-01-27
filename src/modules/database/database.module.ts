import { HttpModule, HttpService } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';

const API_KEY_DEV = 'api_dev';
const API_KEY_PROD = 'api_prod';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_DEV,
    },
    {
      provide: 'TASKS',
      useFactory: async (httpService: HttpService) => {
        const { data } = await lastValueFrom(
          httpService.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
            catchError((error) => {
              throw `Error en la peticion http ${error}`;
            }),
          ),
        );
      },
      inject: [HttpService],
    },
  ],
  exports: ['API_KEY', 'TASKS'],
})
export class DatabaseModule {}

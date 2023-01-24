import AdminJS from 'adminjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { InstancesModule } from './instances/instances.module';
import { User } from './users/user.entity';
import { Instance } from './instances/entities/instance.entity';

AdminJS.registerAdapter({ Database, Resource });
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    AuthModule,
    InstancesModule,
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          Instance,
          {
            resource: User,
            options: {
              properties: {
                name: {
                  isVisible: {
                    list: false,
                    filter: false,
                    show: true,
                    edit: false,
                  },
                },
              },
            },
          },
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

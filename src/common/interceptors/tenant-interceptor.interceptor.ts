import { GqlExecutionContext } from '@nestjs/graphql';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Connection } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class TenantInterceptorInterceptor implements NestInterceptor {
  constructor(private connection: Connection) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const requestGql: Request = ctx.getContext().req;
    const schema = String(requestGql?.headers?.['http_schema'] || '');
    if (schema) await this.setSchema(schema);
    return next.handle().pipe(
      tap(() => {
        if (schema) {
          this.setSchema('public');
        }
      }),
    );
  }

  private async setSchema(schema: string): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.query(`SET search_path TO ${schema}`);
    } finally {
      await queryRunner.release();
    }
  }
}

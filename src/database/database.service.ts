import { Injectable } from '@nestjs/common';
import Knex from 'knex';
import { join } from 'path';

@Injectable()
export class DatabaseService {
  private knex?: Knex;

  getConnection(): Knex {
    if (!this.knex) {
      this.knex = Knex({
        client: 'pg',
        connection:
          process.env.PG_CONNECTION_STRING ||
          'postgres://postgres:postgres@localhost:5432/postgres',
        migrations: {
          extension: 'ts',
          directory: join(__dirname, 'migrations'),
        },
      });
    }

    return this.knex;
  }
}

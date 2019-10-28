// tslint:disable: no-console

import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';
import { DatabaseService } from '../src/database/database.service';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;
NestFactory.create(AppModule, { logger: false })
    .then((appModule) => {
        app = appModule;
        const database = app.get<DatabaseService>(DatabaseService);
        return database.getConnection().migrate.latest();
    })
    .then(() => {
        console.log('Database migrated');
    });

// tslint:disable: no-console

import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';
import { DatabaseService } from '../src/database/database.service';
import { join } from 'path';
import csv from 'csv-parser';
import { createReadStream } from 'fs';

NestFactory.create(AppModule, { logger: false })
    .then((app) => {
        const database = app.get<DatabaseService>(DatabaseService);
        return database.getConnection();

    })
    .then(conn => {
        return conn.transaction((trx) => {
            return trx('t_routes')
                .truncate()
                .then(() => {
                    const csvPath = join(__dirname, '../dataset/routes.csv');
                    return new Promise<any[]>((resolve, reject) => {
                        const lines = [];
                        createReadStream(csvPath)
                            .pipe(csv())
                            .on('data', (row) => {
                                lines.push(row);
                            })
                            .on('end', () => {
                                resolve(lines);
                            })
                            .once('error', reject);
                        });
                })
                .then((lines) => {
                    return trx('t_routes').insert(lines);
                });
        }).then(() => {
            console.log('Seed installed');
        }).catch(e => {
            console.error(e);
        });
    });

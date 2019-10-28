// tslint:disable: no-console

import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';
import { InventoryService } from '../src/inventory.service';

NestFactory.create(AppModule)
    .then((app) => {
        const inventory = app.get<InventoryService>(InventoryService);
        return inventory.getFlights('AF', 'DXB', 'BKK');
    }).then(val => {
        console.log(val);
    }).catch(e => {
        console.error(e);
    });

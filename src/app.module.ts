import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InventoryService } from './inventory.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [InventoryService, DatabaseService],
})
export class AppModule {}

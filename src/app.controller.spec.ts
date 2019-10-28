import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { InventoryService } from './inventory.service';
import { DatabaseService } from './database/database.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [InventoryService, DatabaseService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return flights accordingly', async () => {
      const flights = await appController.getFlights('AF', 'DXB', 'BKK');
      expect(flights).toBeInstanceOf(Array);
      expect(flights[0].stopovers).toStrictEqual([]);
    });

    it('should throw an exception when passed undefined or empty parameters', async () => {
      expect(async () => {
        return await appController.getFlights('AF', 'DXB', undefined);
      }).toThrowError('Invalid airport code');
    });

    it('should throw an exception when passed undefined or empty parameters', async () => {
      expect(async () => {
        return await appController.getFlights('NOPE', 'DXB', 'JFK');
      }).toThrowError('Invalid airline code');
    });

    it('should throw an exception when an airport is not found', async () => {
      expect(async () => {
        return await appController.getFlights('AF', 'CDG', 'XXX');
      }).toThrowError('Airport not found');
    });

    it('should throw an exception when an airline is not found', async () => {
      expect(async () => {
        return await appController.getFlights('XX', 'CDG', 'JFK');
      }).toThrowError('Airline not found');
    });
  });
});

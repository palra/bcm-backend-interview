import { Controller, Get, Param } from '@nestjs/common';
import { InventoryService, Flight } from './inventory.service';
import { AirlineCodePipe } from './validators/airline-code.pipe';
import { AirportCodePipe } from './validators/airport-code.pipe';

@Controller()
export class AppController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('/api/routes/:airline_code/:from/:to')
  async getFlights(
    @Param('airline_code', new AirlineCodePipe()) airlineCode: string,
    @Param('from', new AirportCodePipe()) from: string,
    @Param('to', new AirportCodePipe()) to: string,
  ): Promise<Flight[]> {
    return this.inventoryService.getFlights(airlineCode, from, to);
  }
}

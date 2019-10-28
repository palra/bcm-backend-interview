import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { uniq, flatten } from 'lodash';
import Knex from 'knex';

export interface Flight {
  from: string;
  to: string;
  sellingAirline: string;
  operatedBy: string[];
  stopovers: string[];
  routes: Route[];
}

export interface Route {
  from: string;
  to: string;
  operatedBy: string;
  codeShares?: string[];
}

interface TRoute {
  id: string;
  operating_airline: string;
  from: string;
  to: string;
  code_shares: string;
}

@Injectable()
export class InventoryService {
  constructor(private database: DatabaseService) {}

  private get connection(): Knex {
    return this.database.getConnection();
  }

  async getFlights(
    airlineCode: string,
    from: string,
    to: string,
  ): Promise<Flight[]> {
    /* Here, I don't sanitize/check the input, as I already did in the controller.
       This is a shortcut for the interview, I should have checked the input
       here, as the controller might not have filtered it or as it could be used from
       somewhere else */

    const result = await this.connection.raw(
      `WITH RECURSIVE search_route(
            "id",
            "operating_airline",
            "code_shares",
            "from",
            "to",
            "depth",
            "path"
      ) AS (
        SELECT
          g.id,
          g."operating_airline",
          g."code_shares",
          g."from",
          g."to",
          1            as depth,
          ARRAY [g.id] as path
        FROM t_routes AS g
        WHERE g."from" = :airportFrom
          AND ((operating_airline = :airlineCode)
          OR (code_shares LIKE '%' || :airlineCode || '%'))

        UNION ALL

        SELECT
          g.id,
          g."operating_airline",
          g."code_shares",
          g."from",
          g."to",
          sg.depth + 1    as depth,
          sg.path || g.id as path
        FROM
          t_routes as g,
          search_route as sg
        WHERE g."from" = sg."to"
        AND (
          g.operating_airline = :airlineCode
          or (g.code_shares LIKE '%' || :airlineCode || '%')
        )
        AND (g.id <> ALL(sg.path))
        AND sg.depth <= 3
      )
      SELECT path
      from search_route
      WHERE "to" = :airportTo`,
      {
        airlineCode,
        airportFrom: from,
        airportTo: to,
      },
    );

    const routesIds: string[][] = result.rows.map(row => {
      return row.path;
    });

    const routesList = await this.connection<TRoute>('t_routes').whereIn(
      'id',
      uniq(flatten(routesIds)),
    );
    return routesIds.map(
      (ids): Flight => {
        const routes = ids.map(
          (id): Route => {
            const tRoute = routesList.find(route => route.id === id);
            const splitShares = tRoute.code_shares.split(',');
            return {
              from: tRoute.from,
              to: tRoute.to,
              operatedBy: tRoute.operating_airline,
              codeShares: splitShares.length === 0 ? null : splitShares,
            };
          },
        );

        return {
          from,
          to,
          sellingAirline: airlineCode,
          operatedBy: routes.reduce((acc, route) => {
            if (acc.indexOf(route.operatedBy) === -1) {
              acc.push(route.operatedBy);
            }

            return acc;
          }, []),
          stopovers: routes.slice(1).map(route => route.from),
          routes,
        };
      },
    );
  }
}

# BCM Backend Interview

## Run the project

```
$ docker-compose up
```

Configure the database in a separate terminal : 
```
$ yarn migrate
$ yarn seed
```

> The console might get stuck after the success message is displayed, just quit with `^C`.

Then, test the endpoint with http://localhost:3000/api/routes/AF/DXB/BKK

## Running tests

```
$ yarn test
```

`docker-compose up` must be running in the background, as it relies on the seeded database.

## Technical choices

**Nest.js** :

A TypeScript-first backend framework, inspired from the Angular structure. It focuses on 
architecture and I find that it's a great starting point for scaling projects. They are few
TypeScript frameworks that provides everything shipped to get working, and if we're already 
familiar with Angular and TypeScript, the learning curve isn't that steep. However it can be
harder to grasps its core concepts for the first time.

**PostgreSQL** :

The exercise is all about graph traversal, so a good choice might have been to choose a graph database like Neo4j or OrientDB (actually, Air France use them for some of their projects, but mainly for logistics). However, graph databases are much more relevant when there's a lot of
different classes, which is not the case for that use case. It's still a simple relational model, on
which we can make some recursive queries that are still good enough, and scalable with some good
optimization.

## Notes

- They are still failing tests, they were written as a reference for amelioration axes.
- I didn't sanitized/checked the input in the `InventoryService`, as I already did in the
controller. This is a shortcut for the interview, I should have checked the input in the service 
too, as the controller might not have filtered it or as it could be used from somewhere else.

## Bonus #2

> We would like to be able to cache and reuse results.

Nest.js has cache built-in, configured by default to store cache in-memory. A better production
proof solution would be to rely on an external KV store service, as Redis.

> We would like the endpoint to be secured.

We would require some authentication layer. A good start might be `passport` for an user/password
authentication strategy, combined with a JWT that would be checked before accessing the API.

> Once security and identification in place, we need to be able to rate limit this API.

Using Nest.js' interceptors, we can execute code before and after a given method or an entire module.
Leveragint that feature, we could interface it with a Redis store, counting the number of time a
given user uses the API, and blocking access whenever that limit is reached.
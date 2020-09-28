import { ConnectionOptions } from 'typeorm';

export const ormConfig: ConnectionOptions = {
    cli: {
      migrationsDir: "src/migrations",
    },
    database: 'ljubitelj',
    entities: [
        __dirname + '/entities/*{.ts,.js}',
    ],
    host: 'localhost',
    password: 'postgres',
    port: 5432,
    synchronize: true,
    type: 'postgres',
    username: 'postgres',
};

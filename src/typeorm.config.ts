import path from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: true,
  entities: [path.join(process.cwd(), './src/entities/*.entity.ts')],
  migrations: [],
});

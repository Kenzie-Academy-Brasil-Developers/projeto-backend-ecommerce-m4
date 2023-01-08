import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT),
  database: process.env.DB,
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, "./entities/**.{js,ts}")],
  migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
});

export default AppDataSource;

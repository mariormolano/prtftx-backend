import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true, // Set to false in production
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ["src/domain/entities/*.ts"],
});

export default dataSource;

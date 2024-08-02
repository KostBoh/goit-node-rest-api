import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  username: "kost",
  database: "db_contacts_t2te",
  password: "7rZsOJdfHe9JScvCtYRSWiA6qYf4Pf1z",
  host: "dpg-cqmi2eggph6c739qsii0-a.frankfurt-postgres.render.com",
  port: "5432",
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;

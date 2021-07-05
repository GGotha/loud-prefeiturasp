import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import Roles from "../models/Roles";

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Roles)
      .values([
        {
          name: "Administrator",
          created_at: new Date(),
        },
        {
          name: "User",
          created_at: new Date(),
        },
      ])
      .execute();
  }
}

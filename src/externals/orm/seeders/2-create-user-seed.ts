import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import Users from "../models/Users";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([
        {
          email: "administrator@gmail.com",
          name: "Administrator",
          roles: 1,
          password:
            "$2a$08$t.CH91mdage26nxQ.JThPeLUEDgHvNHYdZ6Ol0B4fF0iFx38VBtSi",
          created_at: new Date(),
        },
        {
          email: "user@gmail.com",
          name: "User",
          roles: 2,
          password:
            "$2a$08$t.CH91mdage26nxQ.JThPeLUEDgHvNHYdZ6Ol0B4fF0iFx38VBtSi",
          created_at: new Date(),
        },
      ])
      .execute();
  }
}

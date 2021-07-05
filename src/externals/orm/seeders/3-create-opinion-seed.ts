import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import Opinions from "../models/Opinions";

export default class CreateOpinions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Opinions)
      .values([
        {
          id_user: 1,
          content: "test opinion 1",
          created_at: new Date(),
        },
        {
          id_user: 2,
          content: "test opinion 2",
          created_at: new Date(),
        },
        {
          id_user: 2,
          content: "test opinion 3",
          created_at: new Date(),
        },
        {
          id_user: 1,
          content: "test opinion 4",
          created_at: new Date(),
        },
      ])
      .execute();
  }
}

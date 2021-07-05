import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import OpinionComments from "../models/OpinionComments";

export default class CreateOpinionUpvotes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(OpinionComments)
      .values([
        {
          id_user: 1,
          id_opinion: 1,
          comment: "comment 1",
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 1,
          comment: "comment 2",
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 1,
          comment: "comment 3",
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 1,
          comment: "comment 4",
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 1,
          comment: "comment 5",
          created_at: new Date(),
        },
      ])
      .execute();
  }
}

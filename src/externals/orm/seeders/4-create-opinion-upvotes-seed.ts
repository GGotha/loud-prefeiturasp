import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import OpinionUpvotes from "../models/OpinionUpvotes";

export default class CreateOpinionUpvotes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(OpinionUpvotes)
      .values([
        {
          id_user: 1,
          id_opinion: 1,
          upvote: true,
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 1,
          upvote: true,
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 2,
          upvote: true,
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 3,
          upvote: true,
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 4,
          upvote: true,
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 1,
          upvote: true,
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 1,
          upvote: true,
          created_at: new Date(),
        },
        {
          id_user: 1,
          id_opinion: 1,
          upvote: true,
          created_at: new Date(),
        },
      ])
      .execute();
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createOpinionsUpvotes1625412142628 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "opinion_upvotes",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "id_opinion",
            type: "int",
            isNullable: false,
          },
          {
            name: "id_user",
            type: "int",
            isNullable: false,
          },
          {
            name: "upvote",
            type: "bool",
            default: true,
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "opinion_upvotes",
      new TableForeignKey({
        columnNames: ["id_opinion"],
        referencedColumnNames: ["id"],
        referencedTableName: "opinions",
      })
    );

    await queryRunner.createForeignKey(
      "opinion_upvotes",
      new TableForeignKey({
        columnNames: ["id_user"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("opinion_upvotes");
  }
}

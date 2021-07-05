import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createOpinionComments1625270528617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "opinion_comments",
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
            name: "comment",
            type: "varchar",
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
      "opinion_comments",
      new TableForeignKey({
        columnNames: ["id_opinion"],
        referencedColumnNames: ["id"],
        referencedTableName: "opinions",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "opinion_comments",
      new TableForeignKey({
        columnNames: ["id_user"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("opinion_comments");
  }
}

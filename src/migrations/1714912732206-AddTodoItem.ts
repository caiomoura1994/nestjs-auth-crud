import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTodoItem1714912732206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "todo_item_entity" (
      "id" serial4 NOT NULL PRIMARY KEY,
      "title" character varying NOT NULL,
      "completed" boolean NOT NULL,
      "created" TIMESTAMP NOT NULL DEFAULT now(),
      "updated" TIMESTAMP NOT NULL DEFAULT now()
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo_item_entity"`);
  }
}

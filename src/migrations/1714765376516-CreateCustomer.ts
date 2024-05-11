import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomer1714765376516 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "customers" (
        "id" serial4 PRIMARY KEY,
        "user_id" int4 REFERENCES users(id),
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePurchase1714765389278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "purchases" (
        "id" serial4 PRIMARY KEY,
        "code" character varying NOT NULL,
        "amount" decimal(10,2) NOT NULL,
        "integration_platform" character varying NOT NULL,
        "integration_code" character varying NOT NULL,
        "customer_id" int4 NOT NULL REFERENCES customers(id),
        "user_id" int4 NOT NULL REFERENCES users(id),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "purchases"`);
  }
}

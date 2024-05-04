import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdInCustomer1714785313151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE customers ADD COLUMN user_id uuid REFERENCES users(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE customers DROP COLUMN user_id`);
  }
}

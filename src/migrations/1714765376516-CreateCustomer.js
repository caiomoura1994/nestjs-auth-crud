class CreateCustomer1714765376516 {
  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "customers" (
                "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                userId uuid REFERENCES users(id),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}

exports.default = {
  CreateCustomer1714765376516,
};

class CreateUser1714745957720 {
  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE users (
                "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

exports.default = {
  CreateUser1714745957720,
};

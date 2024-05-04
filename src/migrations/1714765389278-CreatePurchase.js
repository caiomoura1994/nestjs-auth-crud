class CreatePurchase1714765389278 {
  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "purchases" (
                "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
                "code" character varying NOT NULL,
                "amount" decimal(10,2) NOT NULL,
                "integrationPlatform" character varying NOT NULL,
                "integrationCode" character varying NOT NULL,
                "customerId" uuid NOT NULL,
                "userId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "purchases"`);
  }
}

exports.default = {
  CreatePurchase1714765389278,
};

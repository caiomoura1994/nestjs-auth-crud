class AddUserIdInCustomer1714767733366 {
  async up(queryRunner) {
    await queryRunner.query(`
        ALTER TABLE customers ADD COLUMN user_id uuid REFERENCES users(id);
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE customers DROP COLUMN user_id`);
  }
}

exports.default = {
  AddUserIdInCustomer1714767733366,
};

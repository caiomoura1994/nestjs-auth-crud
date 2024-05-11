import { Injectable } from '@nestjs/common';
import { TenantDto } from './dto/tenant.dto';
import { Connection, getConnection, getManager } from 'typeorm';

@Injectable()
export class TenantsService {
  async create(tenantDto: TenantDto) {
    const schemaName = this.getSchemaName(tenantDto.id);
    console.log('schemaName', schemaName);
    await getManager().query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
    const connection = await getConnection();
    if (!connection.isConnected) connection.connect();
    await connection.query(`SET search_path TO ${schemaName}`);
    await getManager().query(`
    CREATE TABLE IF NOT EXISTS migrations (
        "id" serial4 PRIMARY KEY,
        "timestamp" int8 NOT NULL,
        "name" character varying NOT NULL
    );`);
    await connection.runMigrations();
  }

  async migrate(tenantId?: number) {
    const schemas = await this.filterTenants(tenantId);
    for (let i = 0; i < schemas.length; i += 1) {
      const { schema_name: schemaName } = schemas[i];
      await this.runInTenant(schemaName, 'runMigrations');
    }
    return schemas;
  }

  async revert(tenantId?: number) {
    const schemas = await this.filterTenants(tenantId);
    for (let i = 0; i < schemas.length; i += 1) {
      const { schema_name: schemaName } = schemas[i];
      await this.runInTenant(schemaName, 'undoLastMigration');
    }
    return schemas;
  }

  async findAll() {
    const schemas = await this.filterTenants();
    return schemas;
  }

  private async runInTenant(
    schemaName: string,
    connectionMethod: keyof Connection,
  ) {
    if (schemaName.startsWith('tenant_')) {
      const connection = await getConnection();
      if (!connection.isConnected) connection.connect();
      await connection.query(`SET search_path TO ${schemaName}`);
      if (connectionMethod === 'runMigrations') {
        await connection.runMigrations();
      }
      if (connectionMethod === 'undoLastMigration') {
        await connection.undoLastMigration();
      }
    }
  }

  private async filterTenants(tenantId?: number) {
    const findTenants = 'select schema_name from information_schema.schemata';
    let schemaNameFilter = '';
    if (tenantId) {
      const schemaName = this.getSchemaName(tenantId);
      schemaNameFilter = `where schema_name = '${schemaName}'`;
    }
    const schemas = await getManager().query(
      `${findTenants} ${schemaNameFilter};`,
    );
    console.log('schemas', schemas);
    return schemas || [];
  }

  private getSchemaName(tenantId?: number) {
    return `tenant_${tenantId}`;
  }
}

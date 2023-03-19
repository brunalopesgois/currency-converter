import { Migration } from '@mikro-orm/migrations';

export class Migration20230319024430 extends Migration {
  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    this.addSql(
      'create table "currencies" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "code" varchar(255) not null, constraint "currencies_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "currencies" add constraint "currencies_code_unique" unique ("code");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table "currencies";');
  }
}

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table "currencies" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "code" varchar(255) not null, constraint "currencies_pkey" primary key ("id"));

INSERT INTO currencies (code, created_at) VALUES ('USD', CURRENT_TIMESTAMP);
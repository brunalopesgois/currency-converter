import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Currency {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @Property()
  code: string;

  @Property({ type: 'decimal' })
  value: number;
}

import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ tableName: 'currencies' })
export class Currency extends CustomBaseEntity {
  @Property({ unique: true })
  code: string;
}

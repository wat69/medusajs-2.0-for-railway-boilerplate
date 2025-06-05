import {
  Entity,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"

@Entity()
export class ProductQuestion {
  @PrimaryKey()
  id!: number

  @Property()
  name!: string

  @Property()
  email!: string

  @Property()
  question!: string

  @Property()
  questionType!: string

  @Property({ nullable: true })
  productId?: string

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date()

  @Property({ nullable: true })
  handledAt?: Date

  @Property({ nullable: true })
  deletedAt?: Date
}

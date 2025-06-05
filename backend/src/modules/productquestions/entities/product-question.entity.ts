import {
    Entity,
    PrimaryKey,
    Property,
  } from "@mikro-orm/core"
  
  @Entity()
  export class ProductQuestion {
    @PrimaryKey()
    id!: string
  
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
  
    @Property()
    createdAt: Date = new Date()

    @Property()
    handledAt: Date = new Date()

    @Property()
    deletedAt: Date = new Date()
  }
  
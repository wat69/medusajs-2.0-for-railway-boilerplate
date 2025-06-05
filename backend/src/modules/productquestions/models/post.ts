import { DateTimeProperty, model } from "@medusajs/framework/utils"
import { DateTimeType } from "@mikro-orm/core"

const Post = model.define("post", {
  id: model.id().primaryKey(),
  name: model.text(),
  email: model.text().searchable(),
  question: model.text(),
  questionType: model.text(),
  productId: model.text().searchable().nullable(),
  createdAt: model.dateTime()
})

export default Post
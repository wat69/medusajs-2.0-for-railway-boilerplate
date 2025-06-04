import { ProductQuestion } from "./entities/product-question.entity"
import { ProductQuestionService } from "./services/product-question.service"

export const moduleDefinition = {
  service: {
    key: "productQuestionService",
    // referens till klassen:
    cls: ProductQuestionService,
  },
  models: [ProductQuestion],
}

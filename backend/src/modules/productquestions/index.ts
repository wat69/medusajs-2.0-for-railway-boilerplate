import { ProductQuestionService } from "./services/product-question.service"
import { ProductQuestion } from "./entities/product-question.entity"

const mod = {
    service: {
      key: "productQuestionService",
      cls: ProductQuestionService,
    },
    models: [ProductQuestion],
    __joinerConfig: {
      serviceName: "productQuestionService",
      primaryKeys: ["id"],
      alias: "product_question",
    }
  }
  
  // Gör BARA EN EXPORT, BÅDE FÖR ESM OCH CJS!
  export = mod
  
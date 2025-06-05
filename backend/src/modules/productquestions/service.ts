import { MedusaService } from "@medusajs/framework/utils"
import Post from "./models/post"

class ProductQuestionService extends MedusaService({Post}){}

export default ProductQuestionService
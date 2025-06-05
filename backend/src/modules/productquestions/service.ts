import { MedusaService } from "@medusajs/framework/utils"
import Question from "./models/post"

class ProductQuestionService extends MedusaService({
  Question,
}) {
    async createPosts(data) {
      // skapa fråga
    }
    async deletePosts(id) {
      // ta bort fråga
    }
  }
  
export default ProductQuestionService
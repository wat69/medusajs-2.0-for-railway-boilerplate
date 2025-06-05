import { Router } from "express"
import { ProductQuestion } from "../../../../modules/productquestions/entities/productquestion.entity"
import { EntityManager } from "@mikro-orm/core"

export default (app) => {
  const route = Router()

  route.get("/admin/custom/questions", async (req, res) => {
    const manager = (req as any).scope.resolve("manager") as EntityManager
    const repo = manager.getRepository(ProductQuestion)
    const questions = await repo.findAll()
    res.json(questions)
  })

  app.use(route)
}

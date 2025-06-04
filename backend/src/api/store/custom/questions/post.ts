// src/api/store/questions/post.ts

import { Router } from "express"

export default (app) => {
  const route = Router()

  route.post("/store/questions", async (req, res) => {
    const { name, email, question, questionType } = req.body

    // TODO: Spara i databas (t.ex. med mikroORM eller direkt SQL)
    console.log("Mottagen fråga:", req.body)

    res.json({ message: "Question received" })
  })

  app.use("/store", route)
}

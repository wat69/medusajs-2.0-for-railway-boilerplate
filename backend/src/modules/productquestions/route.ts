import type { 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/framework/http"
  import { 
    createQuestionWorkflow,
  } from "../../workflows/create-question"
  
  export async function POST(
    req: MedusaRequest, 
    res: MedusaResponse
  ) {
    const { result: post } = await createQuestionWorkflow(req.scope)
      .run({
        input: {
            name: "name",
            email: "email",
            question: "question",
            questionType: "questionType",
            productId: "productId"
        },
      })
  
    res.json({
      post,
    })
  }
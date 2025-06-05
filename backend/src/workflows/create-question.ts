import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
  } from "@medusajs/framework/workflows-sdk"
  import { QUESTION_MODULE } from "../modules/productquestions"
  import ProductQuestionService from "../modules/productquestions/service"
  
  type CreateProductQuestionInput = {
    name: string
    email: string
    question: string
    questionType: string
    productId?: string
    createdAt: Date
  }
  
  const createProductQuestionStep = createStep(
    "create-product-question",
    async (input: CreateProductQuestionInput, { container }) => {
      const questionService: ProductQuestionService = container.resolve(QUESTION_MODULE)
      const question = await questionService.createPosts(input)
      return new StepResponse(question, question)
    },
    async (question, { container }) => {
      const questionService: ProductQuestionService = container.resolve(QUESTION_MODULE)
      await questionService.deletePosts(question.id)
    }
  )
  
  export const createProductQuestionWorkflow = createWorkflow(
    "create-product-question",
    (input: CreateProductQuestionInput) => {
      const question = createProductQuestionStep(input)
      return new WorkflowResponse(question)
    }
  )
  
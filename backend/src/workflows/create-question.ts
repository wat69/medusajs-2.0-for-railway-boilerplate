import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
  } from "@medusajs/framework/workflows-sdk"
  import { QUESTION_MODULE } from "../modules/productquestions"
  import ProductQuestionService from "../modules/productquestions/service"
  
  type CreateQuestionInput = {
    name: string
    email: string
    question: string
    questionType: string
    productId?: string
  }
  
  const createQuestionStep = createStep(
    "create-product-question",
    async (input: CreateQuestionInput, { container }) => {
      const questionService: ProductQuestionService = container.resolve(QUESTION_MODULE)
      const question = await questionService.createPosts(input)
      return new StepResponse(question, question)
    },
    async (question, { container }) => {
      const questionService: ProductQuestionService = container.resolve(QUESTION_MODULE)
      await questionService.deletePosts(question.id)
    }
  )
  
  export const createQuestionWorkflow = createWorkflow(
    "create-product-question",
    (input: CreateQuestionInput) => {
      const question = createQuestionStep(input)
      return new WorkflowResponse(question)
    }
  )
  
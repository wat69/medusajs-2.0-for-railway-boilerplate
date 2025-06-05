import ProductQuestionService from "./service"
import { Module } from "@medusajs/framework/utils"

export const QUESTION_MODULE = "productquestions"

export default Module(QUESTION_MODULE, {
  service: ProductQuestionService,
})
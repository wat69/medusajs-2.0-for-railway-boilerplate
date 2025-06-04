import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { ModuleExports } from "@medusajs/types"
import { ProductQuestion } from "./entities/product-question.entity"

export const moduleDefinition: ModuleExports = {
  service: {}, // tom just nu
  models: [ProductQuestion],
  migrations: [], // kan läggas till senare
}

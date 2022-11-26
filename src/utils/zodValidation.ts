import { z } from 'zod'

const user = z.object({
    type: z.string(),
    description: z.string()
})

const fields = z.object({
    fieldName: z.string(),
    required: z.boolean(),
    fieldDescription: z.string(),
    dataSource: z.string().nullish(),
    editable: z.boolean(),
    type: z.string()
})

const specification = z.object({
  title: z.string(),
  description: z.string(),
  functionalSpecificationFields: z.array(fields).nullish(),
})

export const documentData = z.object({
   clientLogo: z.string().url(),
   clientName: z.string(),
   projectDescription: z.string(),
   projectName: z.string(),
   documentScope: z.string(),
   projectDiagram: z.string().url().nullish(),
   userDescription: z.array(user),
   functionalSpecification: z.array(specification),
   sistemConfiguration: z.string().nullish(),
   nonFunctionalRequests: z.string().nullish(),
   dataConversion: z.string().nullish()
})
import { FastifyInstance } from "fastify";
import { z } from 'zod'

import { downloadImage } from '../utils/downloadImg';

import { deleteImg } from '../utils/deleteImg';
import { PDFStructure } from '../components/pdfStructure';

export async function FunctionalDocument( fastify: FastifyInstance){
   fastify.post('/functionalDocument' ,async (req, reply) => {
  //validating data using zod lib
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

  const documentData = z.object({
      clientLogo: z.string().url(),
      clientName: z.string(),
      projectDescription: z.string(),
      projectName: z.string(),
      documentScope: z.string(),
      projectDiagram: z.string().url(),
      userDescription: z.array(user),
      functionalSpecification: z.array(specification),
      sistemConfiguration: z.string().nullish(),
      nonFunctionalRequests: z.string().nullish(),
      dataConversion: z.string().nullish()
  })

   const documentInfo = documentData.parse(req.body)

   await downloadImage(documentInfo.clientLogo, `src/Images/${documentInfo.clientName}clientlogo.png`)
    
   //document structure
   const { 
    clientLogo,
    clientName,
    documentScope,
    functionalSpecification,
    projectDescription,
    projectDiagram,
    projectName,
    userDescription,
    dataConversion,
    nonFunctionalRequests,
    sistemConfiguration,
    } = documentInfo   

   PDFStructure({ 
    clientLogo,
    clientName,
    documentScope,
    functionalSpecification,
    projectDescription,
    projectDiagram,
    projectName,
    userDescription,
    dataConversion,
    nonFunctionalRequests,
    sistemConfiguration
    });

   await deleteImg(`src/Images/${documentInfo.clientName}clientlogo.png`)
  })
}


import { FastifyInstance } from "fastify";
import { downloadImage } from '../utils/downloadImg';

import { deleteImg } from '../utils/deleteImg';
import { PDFStructure } from '../components/pdfStructure';
import { documentData } from "../utils/zodValidation";

export async function FunctionalDocument( fastify: FastifyInstance){
   fastify.post('/functionalDocument' ,async (req, reply) => {
  //validating data using zod lib

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


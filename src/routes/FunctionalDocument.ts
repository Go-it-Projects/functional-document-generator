import { FastifyInstance } from "fastify";
import { downloadImage } from '../utils/downloadImg';

import { deleteImg } from '../utils/deleteImg';
import { PDFStructure } from '../components/pdfStructure';
import { documentData } from "../utils/zodValidation";
import { createNodePage } from "../utils/notionIntegration";
import { UploadFile } from "../utils/uploadFile";

import fs from 'fs'

export async function FunctionalDocument( fastify: FastifyInstance){
   fastify.post('/functionalDocument' ,async (req, reply) => {
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
    officialDocument
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
    sistemConfiguration,
    officialDocument
    });

   await deleteImg(`src/Images/${documentInfo.clientName}clientlogo.png`)

    const nomeCliente = clientName.replace(" ", "")
    var document = fs.readFileSync(`${nomeCliente}FunctionalDocument.pdf`)

    await UploadFile(document, nomeCliente)

   if(officialDocument == true){
     createNodePage( projectName, documentScope, clientLogo, nomeCliente)
   }

  })
}


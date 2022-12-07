import { FastifyInstance } from "fastify";
import { downloadImage } from '../utils/downloadImg';
import { deleteFiles } from '../utils/deleteFiles';
import { PDFStructure } from '../components/pdfStructure';
import { documentData } from "../utils/zodValidation";
import { createNodePage } from "../utils/notionIntegration";
import { UploadFile } from "../utils/uploadFile";
import fs from 'fs'
import { deletePDF } from "../utils/deletePDF";



export async function FunctionalDocument( fastify: FastifyInstance) {

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

    await PDFStructure({ 
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

    const nomeCliente = clientName.replace(" ", "")
    
    deleteFiles(`src/Images/${documentInfo.clientName}clientlogo.png`)
    
    setTimeout(() => {
      var document = fs.readFileSync(`src/Document/${nomeCliente}FunctionalDocument.pdf`)
      UploadFile(document,nomeCliente) 
    },5000)
    
    if(officialDocument == true){
      createNodePage( projectName, documentScope, clientLogo, nomeCliente)
    }
    
    setTimeout(() => {
      deletePDF(`src/Document/${nomeCliente}FunctionalDocument.pdf`)
    },5000)
    
  })
}


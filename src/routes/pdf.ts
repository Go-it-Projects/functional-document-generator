import PDFTable from 'pdfkit-table'
import PDFDocument from 'pdfkit'

import fs from 'fs'
import { FastifyInstance } from "fastify";
import { z } from 'zod'

export async function Pdf( fastify: FastifyInstance){
   fastify.post('/functionalDocument' ,async (req, reply) => {

    //generating the date automaticaly
   const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
   var today = new Date()
   const actualData = today.getDate() + " de " + months[today.getMonth()]+ " de " + today.getFullYear()

   //validating data using zod lib
    const user = z.object({
        type: z.string(),
        description: z.string()
    })

    const fields = z.object({
        fieldName: z.string(),
        required: z.boolean(),
        fieldDescription: z.string(),
        dataSource: z.string(),
        editable: z.boolean(),
        type: z.string()
    })

   const documentData = z.object({
       clientLogo: z.string().url(),
       clientName: z.string(),
       projectDescription: z.string(),
       projectName: z.string(),
       documentScope: z.string(),
       projectDiagram: z.string().url(),
       userDescription: z.array(user),
       functionalSpecificationFields: z.array(fields),
       sistemConfiguration: z.string().nullish(),
       nonFunctionalRequests: z.string().nullish(),
       dataConversion: z.string().nullish()
   })

    const documentInfo = documentData.parse(req.body)

    // console.log(documentInfo)

   //document structure
    var doc = new PDFTable();

    doc.pipe(fs.createWriteStream('example2.pdf'))

    const DEFAULT_FONT_SIZE = 12
    const BIG_FONT_SIZE = 18
    const TITLE_FONT_SIZE = 16
    const SUB_TITLE_FONT_SIZE= 14
    const DEFAULT_FONT = 'Helvetica'
    const BOLD_FONT = 'Helvetica-Bold'

    doc
    .image('goitlogo.png', {
        align: 'center',
        fit: [450, 300],
        valign: 'center',

    })
    .fontSize(24)
    .font(BOLD_FONT)
    .moveDown(12)
    .text(documentInfo.clientName, {
        align: 'center'
    })
    .fontSize(BIG_FONT_SIZE)
    .moveDown(3)
    .font(DEFAULT_FONT)
    .text(documentInfo.projectDescription, {
        align: 'center'
    })
    .moveDown(2)
    .text('Documento de especificação funcional',{
        align: 'center'
    })
    .font(BOLD_FONT)
    .moveDown(1)
    .text(documentInfo.projectName,{
        align: 'center'
    })
    .moveDown(3)
    .font(DEFAULT_FONT)
    .fontSize(TITLE_FONT_SIZE)
    .text(actualData ,{
        align: 'center',
    })

    doc
    .addPage()
    .font(BOLD_FONT)
    .fontSize(TITLE_FONT_SIZE)
    .text('1.Introdução',{
        align: 'left'
    })
    .moveDown(2)
    .fontSize(SUB_TITLE_FONT_SIZE)
    .text('1.1 Escopo do documento', {
        align:'left'
    })
    .font(DEFAULT_FONT)
    .moveDown(1)
    .fontSize(DEFAULT_FONT_SIZE)
    .text(documentInfo.documentScope, {
        align:'left'
    })

    .moveDown(5)
    .font(BOLD_FONT)
    .fontSize(TITLE_FONT_SIZE)
    .text('2.Overview da solução',{
        align: 'left'
    })
    .moveDown(1)
    .fontSize(SUB_TITLE_FONT_SIZE)
    .text('2.1 Diagramas', {
        align:'left'
    })
    .font(DEFAULT_FONT)
    .moveDown(1)
    .fontSize(DEFAULT_FONT_SIZE)
    .text('Diagramas ficarão aqui rs rs rs', {
        align:'left'
    })

    .moveDown(2)
    .font(BOLD_FONT)
    .fontSize(SUB_TITLE_FONT_SIZE)
    .text('2.2 Usuários do sistema', {
        align:'left'
    })
    .font(DEFAULT_FONT)
    .moveDown(1)
    .fontSize(DEFAULT_FONT_SIZE)

    //users grid
   
    doc
    .table({
        headers: [
            {label: "Type", property: "type"},
            {label: "Description", property: "description"}
        ],
        datas: documentInfo.userDescription
    })
    doc
    .addPage()
    .font(BOLD_FONT)
    .fontSize(TITLE_FONT_SIZE)
    .text('3.Especificações funcionais',{
        align: 'left'
    })
    .moveDown(2)
    .fontSize(SUB_TITLE_FONT_SIZE)
    .text('3.1 Titulo especificação', {
        align:'left'
    })

    .moveDown(2)
    .fontSize(DEFAULT_FONT_SIZE)
    .text('3.1.1 Descrição', {
        align:'left'
    })

    .moveDown(1)
    .font(DEFAULT_FONT)
    .fontSize(DEFAULT_FONT_SIZE)
    .text('Aqui esta um exemplo de Especificação funcional, o usuario deverá ter a possibilidade de criar varias especificações', {
        align:'left'
    })

    .moveDown(2)
    .font(BOLD_FONT)
    .fontSize(DEFAULT_FONT_SIZE)
    .text('3.1.2 Mockups', {
        align:'left'
    })

    .moveDown(1)
    .font(DEFAULT_FONT)
    .fontSize(DEFAULT_FONT_SIZE)
    .text('Aqui esta um exemplo de Mock-ups da Especificação funcional, o usuario deverá ter a possibilidade de fazer upload de varias mockups', {
        align:'left'
    })

    .moveDown(2)
    .font(BOLD_FONT)
    .fontSize(DEFAULT_FONT_SIZE)
    .text('3.1.3 Especificação dos campos', {
        align:'left'
    })

    .moveDown(2)
    doc
    .table({
        headers: [
            {label: "Nome do Campo", property: "fieldName"},
            {label: "Mandatório", property: "required"},
            { label: "Editável", property:'editable' },
            { label: "Tipo", property:'type' },
            { label: "Descrição", property:'fieldDescription' },
            { label: "Fonte de dados", property:'dataSource' }
        ],
        datas: documentInfo.functionalSpecificationFields
    })

    {
        documentInfo.sistemConfiguration && 
        doc
        .addPage()
        .moveDown(2)
        .font(BOLD_FONT)
        .fontSize(TITLE_FONT_SIZE)
        .text('4. Configuração do Sistema', {
            align:'left'
        })
    
        .moveDown(1)
        .font(DEFAULT_FONT)
        .fontSize(DEFAULT_FONT_SIZE)
        .text(documentInfo.sistemConfiguration, {
            align:'left'
        })
    }

   {
    documentInfo.nonFunctionalRequests && 
    doc
    .moveDown(2)
    .font(BOLD_FONT)
    .fontSize(TITLE_FONT_SIZE)
    .text('5. Outros requisitos do sistema/ Requisitos não funcionais', {
        align:'left'
    })

    .moveDown(1)
    .font(DEFAULT_FONT)
    .fontSize(DEFAULT_FONT_SIZE)
    .text(documentInfo.nonFunctionalRequests, {
        align:'left'
    })
   }
  {
    documentInfo.dataConversion &&
    doc
    .moveDown(2)
    .font(BOLD_FONT)
    .fontSize(TITLE_FONT_SIZE)
    .text('6. Preparação de conversão de dados', {
        align:'left'
    })

    .moveDown(1)
    .font(DEFAULT_FONT)
    .fontSize(DEFAULT_FONT_SIZE)
    .text(documentInfo.dataConversion, {
        align:'left'
    })
  }
    doc.end()
   })
}
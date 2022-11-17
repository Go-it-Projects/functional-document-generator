import PDFDocument from 'pdfkit'

import fs from 'fs'
import { FastifyInstance } from "fastify";
import { z } from 'zod'
import doc from 'pdfkit';

export async function Pdf( fastify: FastifyInstance){
   fastify.post('/functionalDocument' ,async (req, reply) => {

    //generating the date automaticaly
   const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
   var today = new Date()
   const actualData = today.getDate() + " de " + months[today.getMonth()]+ " de " + today.getFullYear()

   //validating data using zod lib
    const user = z.object({
        id: z.string().uuid(),
        name: z.string(),
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
       functionalSpecifications: z.any(),

   })

    const documentInfo = documentData.parse(req.body)

    // console.log(documentInfo)

   //document structure
    const doc = new PDFDocument();
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
    .lineCap('butt')
    .moveTo(270, 400)
    .lineTo(270, 540)
    .stroke()
  
     documentInfo.userDescription?.map(data => {
        textInRowFirst(doc, data.name, 402);
        row(doc, 400);
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

    .lineCap('butt')
    .moveTo(270, 400)
    .lineTo(270, 540)
    .stroke()
  
      row(doc, 400);
      row(doc, 420);
      row(doc, 440);
      row(doc, 460);
      row(doc, 480);
      row(doc, 500);
      row(doc, 520);
  
     documentInfo.userDescription?.map(data => {
        textInRowFirst(doc, data.name, 402);
     })

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
     .text('Aqui esta um exemplo da Configuração do Sistema, o usuario deverá ter a possibilidade de fazer upload de varias mockups', {
         align:'left'
     })


     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('5. Outros requisitos do sistema/Requisitos não funcionais', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Requisitos não Funcionais: balblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablabla', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('6. Requisitos de relatório', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Requisitos de relátorio: balblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablabla', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('7. Integração de relátorio', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Integração de relátorio: balblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablablabalblablablablablabla', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('8. Tratamento de Exceções/Relatório de Erros', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Relatório de erros: 123 erros encontrados', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('9. Requisitos de migração/conversão de dados', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Requisitos de migração: 123 migrações e conversões', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('10. Estratégia de conversão de dados', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Estratégia 1,2 e 18 serão usadas', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('11. Preparação de conversão de dados', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Prepare os dados de maneira cascata', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('12. Espeficações da conversão de dados', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Espeficações ficaram aqui boy', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('13. Referencias', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Referencias', {
         align:'left'
     })

     .moveDown(2)
     .font(BOLD_FONT)
     .fontSize(TITLE_FONT_SIZE)
     .text('14.  Problemas em aberto', {
         align:'left'
     })
 
     .moveDown(1)
     .font(DEFAULT_FONT)
     .fontSize(DEFAULT_FONT_SIZE)
     .text('Problemas em aberto: 12 problemas', {
         align:'left'
     })

    doc.end()
   })
}

function textInRowFirst(doc: any, text: string, heigth: any) {
    doc.y = heigth;
    doc.x = 30;
    doc.fillColor('black')
    doc.text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
    return doc
  }
  
  function row(doc: any, heigth: any) {
    doc
    .lineJoin('miter')
      .rect(30, heigth, 500, 20)
      .stroke()
    return doc
  }

  

 
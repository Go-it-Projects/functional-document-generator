import PDFDocumentWithTables from "pdfkit-table";
import fs from 'fs'

interface DocumentProps {
    clientLogo: string,
    clientName: string,
    documentScope: string,
    functionalSpecification: any,
    projectDescription: string,
    projectDiagram: string | null | undefined ,
    projectName: string,
    userDescription: any,
    sistemConfiguration: string | null | undefined ,
    nonFunctionalRequests: string | null | undefined,
    dataConversion: string | null | undefined
}

export function PDFStructure(props: DocumentProps){
      //generating the date automaticaly
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  var today = new Date()
  const actualData = today.getDate() + " de " + months[today.getMonth()]+ " de " + today.getFullYear()

  var doc = new PDFDocumentWithTables();

  const DEFAULT_FONT_SIZE = 12
  const BIG_FONT_SIZE = 18
  const TITLE_FONT_SIZE = 16
  const SUB_TITLE_FONT_SIZE= 14
  const DEFAULT_FONT = 'Helvetica'
  const BOLD_FONT = 'Helvetica-Bold'

  doc
  .image(`src/Images/${props.clientName}clientlogo.png`, (doc.page.width - 180)/2, doc.y,{
      width: 180
  })

  doc
  .fontSize(24)
  .font(BOLD_FONT)
  .moveDown(5)
  .text(props.clientName, {
      align: 'center'
  })
  .fontSize(BIG_FONT_SIZE)
  .moveDown(3)
  .font(DEFAULT_FONT)
  .text(props.projectDescription, {
      align: 'center'
  })
  .moveDown(2)
  .text('Documento de especificação funcional',{
      align: 'center'
  })
  .font(BOLD_FONT)
  .moveDown(1)
  .text(props.projectName,{
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
  .text(props.documentScope, {
      align:'left'
  })

  .moveDown(5)
  .font(BOLD_FONT)
  .fontSize(TITLE_FONT_SIZE)
  .text('2.Overview da solução',{
      align: 'left'
  })
  {
    props.projectDiagram ?
    doc
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
    .fontSize(DEFAULT_FONT_SIZE):
    doc
    .moveDown(2)
    .font(BOLD_FONT)
    .fontSize(SUB_TITLE_FONT_SIZE)
    .text('2.1 Usuários do sistema', {
        align:'left'
    })
    .font(DEFAULT_FONT)
    .moveDown(1)
    .fontSize(DEFAULT_FONT_SIZE)
  }
  

  //users grid
 
  doc
  .table({
      headers: [
          {label: "Type", property: "type"},
          {label: "Description", property: "description"}
      ],
      datas: props.userDescription
  })
  doc
  .addPage()
  .font(BOLD_FONT)
  .fontSize(TITLE_FONT_SIZE)
  .text('3.Especificações funcionais',{
      align: 'left',
  })
  {
    props.functionalSpecification.forEach( (data: any, index: any) => {
        doc
        .moveDown(2)
        .font(BOLD_FONT)
        .fontSize(SUB_TITLE_FONT_SIZE)
        .text("3."+ (index + 1)+" "+ data.title, {
            align:'left'
        })

        .moveDown(1)
        .fontSize(DEFAULT_FONT_SIZE)
        .text('Descrição:', {
            align:'left'
        })

        .moveDown(1)
        .font(DEFAULT_FONT)
        .fontSize(DEFAULT_FONT_SIZE)
        .text(data.description, {
            align:'left'
        })


        .moveDown(2)
       {
        data.functionalSpecificationFields &&
        doc
        .table({
            title:'Especificação dos campos:',
            headers: [
                {label: "Nome do Campo", property: "fieldName"},
                {label: "Mandatório", property: "required"},
                { label: "Editável", property:'editable' },
                { label: "Tipo", property:'type' },
                { label: "Descrição", property:'fieldDescription' },
                { label: "Fonte de dados", property:'dataSource' }
            ],
            datas: data.functionalSpecificationFields
        })
       }

    })
  }
  {
      props.sistemConfiguration && 
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
      .text(props.sistemConfiguration, {
          align:'left'
      })
  }

 {
  props.nonFunctionalRequests && 
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
  .text(props.nonFunctionalRequests, {
      align:'left'
  })
 }
  {
      props.dataConversion &&
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
      .text(props.dataConversion, {
          align:'left'
      })
  }
  doc.end()

  doc.pipe(fs.createWriteStream(`${props.clientName}FunctionalDocument.pdf`))
}
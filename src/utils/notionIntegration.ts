import { Client } from "@notionhq/client"
import dotenv from 'dotenv'
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const pageId = 'fe231da276534d1cb9e5cd8f8d9bbf41'

export async function createNodePage(projectName: string, projectDescription: string, clientLogo: string, nomeCliente:string){

    const response = await notion.pages.create({
        "cover": {
            "type": "external",
            "external": {
                "url": `${clientLogo}`
            }
        },
        "icon": {
            "type": "emoji",
            "emoji": "🏢"
        },
        "parent": {
            "type": "page_id",
            "page_id": `${pageId}`
        },
        "properties": {
            "title":{
                "type": "title",
                "title": [
                    {   
                        "type": "text",
                        "text": {
                            "content": `${projectName}`,
                            "link": null
                        }
                    }
                ]
            }
        },
        "children": [
            {
                "object": "block",
                "heading_2": {
                    "rich_text": [
                        {
                            "text": {
                                "content": "Objetivo:"
                            }
                        }
                    ]
                }
            },
            {
                "object": "block",
                "paragraph": {
                    "rich_text": [
                        {
                            "text": {
                                "content": `${projectDescription}`,
                                "link": null
                            }
                        }
                    ],
                    "color": "default"
                }
            },
            {
                "object": "block",
                "heading_2": {
                    "rich_text": [
                        {
                            "text": {
                                "content": "Documento funcional:"
                            }
                        }
                    ]
                }
            },
            {
                "object": "block",
                "file": {
                   "external":{
                    "url":`https://functional-document-bucket.s3.amazonaws.com/${nomeCliente}-FunctionalDocument.pdf`
                   }
                }
            }
        ]
    });

    console.log(response)
}

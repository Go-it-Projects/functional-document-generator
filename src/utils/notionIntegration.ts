import { Client } from "@notionhq/client"
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const pageId = process.env.NOTION_PAGE_ID

export async function createNodePage(projectName: string, projectDescription: string, clientLogo: string ){

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
            }
            // {
            //     "object": "block",
            //     "file": {
            //        "external":{
            //         "url":""
            //        }
            //     }
            // }
        ]
    });

    console.log(response)
}

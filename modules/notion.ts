import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import dotenv from "dotenv";


dotenv.config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.DB_ID;

export async function
    getDatabase(creditCard: string, month: string) {
    const response = await notion.databases.query({
        database_id: databaseId ?? "",
        filter: {
            and: [
                {
                    property: "Tarjeta",
                    select: {
                        equals: creditCard
                    }
                },
                {
                    property: "Mes",
                    multi_select: {
                        contains: month
                    }
                }
            ]
        }
    });
    return response.results.map((page) => {
        const casted = page as any;
        return {
            id: casted.id,
            concepto: casted.properties.Concepto.title[0]?.plain_text,
            monto: casted.properties.Monto.number,
            moneda: casted.properties.Moneda.select.name

        }
    })
}


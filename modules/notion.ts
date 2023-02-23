import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import dotenv from "dotenv";

type Record = {
    concepto: string;
    monto: string;
    moneda: string;
    mes: string[];
    tarjeta: string;
}

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
};

export async function createEntry(entry: Record) {
    const properties = {
        Concepto: {
            title: [
                {
                    text: {
                        content: entry.concepto
                    }
                }
            ]
        },
        Moneda: {
            select: {
                name: entry.moneda
            }
        },
        Monto: {
            number: parseFloat(entry.monto)
        },
        Mes: {
            multi_select: entry.mes.map((x) => ({ name: x }))
        },
        Tarjeta: {
            select: {
                name: entry.tarjeta
            }
        },
    }
    const response = await notion.pages.create({
        parent: {
            database_id: databaseId ?? "",
        },
        properties: properties as any
    });

    return response;
};


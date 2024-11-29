"use server"

import { CreateCategorySchema, CreateCategorySchemaType } from "./schema-category"

export async function CreateCategory(form:CreateCategorySchemaType){
    const parsedBoy=CreateCategorySchema.safeParse(form);
    if(!parsedBoy.success){
        throw new Error("bad request")
    }


}

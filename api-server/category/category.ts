import { TransactionType } from "@/models/extension/transaction-type";
import http from "../http/http";
import { ApiResponse } from "@/models/api-response";
import { CategoryDto } from "@/models/category/category-dto";

export const categoryApiRequest={
    getAllCategoryByType:(input:{type:TransactionType, fields?:string})=>
        http.get<ApiResponse<Array<CategoryDto>>>(`Category/GetAllCategoryByType/${input.type}?fields=${input.fields}`),
}

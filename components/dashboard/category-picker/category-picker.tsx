"use client"

import { CategoryApi, Configuration, TransactionType } from '@/server'
import React, { useState } from 'react'
import {useQuery} from "@tanstack/react-query"

interface Props{
    type:TransactionType
}

const apiConfig = new Configuration({ basePath: 'http://localhost:5000' });
const categoryApi = new CategoryApi(apiConfig);

const CategoryPicker = ({type}:Props) => {
    const [open, setOpen]=useState<boolean>(false);
    const [value, setValue]=useState<string>("");

    const categoriesQuery=useQuery({
        queryKey: ["categories", type],
        queryFn:()=>
            categoryApi.apiCategoryGetAllCategoryByTypeTypeGet({ type })
    })

    const selectedcategory=categoriesQuery.data?.find((categpry:Cate))

    return (
        <div>category-picker</div>
    )
}

export default CategoryPicker

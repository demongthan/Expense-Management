"use client"

import React, { useState } from 'react'
import {useQuery} from "@tanstack/react-query"
import { TransactionType } from '@/models/extension/transaction-type'
import { categoryApiRequest } from '@/api-server/category/category'
import { CategoryDto } from '@/models/category/category-dto'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import CategoryRow from './category-row/category-row'
import { Command, CommandInput } from '@/components/ui/command'
import CreateCategoryDialog from './create-category-dialog/create-category-dialog'

interface Props{
    type:TransactionType
}

const CategoryPicker = ({type}:Props) => {
    const [open, setOpen]=useState<boolean>(false);
    const [value, setValue]=useState<string>("");

    const categoriesQuery=useQuery({
        queryKey: ["categories", type],
        queryFn:()=>
            categoryApiRequest.getAllCategoryByType({type:type}).then((res)=>res.payload.data)
    })

    const selectedCategory=categoriesQuery.data?.find((categpry:CategoryDto)=>categpry.name==value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
                    {selectedCategory?(
                        <CategoryRow category={selectedCategory}></CategoryRow>
                    ):(
                        "Select category"
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                    <CommandInput placeholder='Search category'></CommandInput>
                    <CreateCategoryDialog></CreateCategoryDialog>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CategoryPicker

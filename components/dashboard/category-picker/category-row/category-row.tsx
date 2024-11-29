"use client"

import React, { useState } from 'react'

import { CategoryDto } from '@/models/category/category-dto'

interface Props{
    category:CategoryDto
}

const CategoryRow = ({category}:Props) => {
    const [open, setOpen]=useState<boolean>(false);

    return (
        <div className='flex items-center gap-2'></div>
    )
}

export default CategoryRow

"use client"

import { CategoryDto } from '@/models/category/category-dto'
import React from 'react'

interface Props{
    category:CategoryDto
}

const CategoryRow = ({category}:Props) => {
    return (
        <div className='flex items-center gap-2'></div>
    )
}

export default CategoryRow

"use client"

import { TransactionType } from '@/models/extension/transaction-type'
import React, { useState } from 'react'

interface Props{
    type:TransactionType
}

const CreateCategoryDialog = () => {
    const [open, setOpen]=useState<boolean>(false);

    return (
        <div>create-category-dialog</div>
    )
}

export default CreateCategoryDialog

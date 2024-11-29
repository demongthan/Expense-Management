"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { TransactionType } from '@/models/extension/transaction-type'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'

interface Props{
    type:TransactionType
}

const formSchema = z.object({
    name:z.string().min(3).max(20),
    icon:z.string().max(20),
    type:z.nativeEnum(TransactionType)
})

const CreateCategoryDialog = () => {
    const [open, setOpen]=useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            icon: "",
            type: TransactionType.Income
        },
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"}
                className='flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground'>
                    <PlusSquare className='mr-2 h-4 '></PlusSquare>
                    Create new
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create {" "}</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategoryDialog

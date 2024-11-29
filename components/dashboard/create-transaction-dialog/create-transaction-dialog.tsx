"use client"

import React, { ReactNode } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CategoryPicker from '../category-picker/category-picker'
import { TransactionType, TransactionTypeDisplay } from '@/models/extension/transaction-type'

interface Props{
    trigger:ReactNode,
    type:TransactionType
}

const formSchema = z.object({
    amount:z.coerce.number().positive().multipleOf(0.01),
    description:z.string().optional(),
    date:z.coerce.date(),
    category:z.string(),
    type:z.nativeEnum(TransactionType)
})

const CreateTransactionDialog = ({trigger, type}:Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type:type,
            date:new Date(),
        },
    })

    const onSubmit=(values: z.infer<typeof formSchema>) =>{
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a new {""}
                        <span className={cn("m-1", type===TransactionType.Income?"text-emerald-500":"text-red-500")}>{TransactionTypeDisplay[type]}</span>
                         transaction
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) =>
                        (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input defaultValue={""} {...field} />
                                </FormControl>
                                <FormDescription>
                                    Transaction description (optional)
                                </FormDescription>
                            </FormItem>
                        )}>
                        </FormField>

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) =>
                        (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input defaultValue={0} {...field} type='number'/>
                                </FormControl>
                                <FormDescription>
                                    Transaction amount (required)
                                </FormDescription>
                            </FormItem>
                        )}>
                        </FormField>

                        <div className='flex items-center justify-between gap-2'>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) =>
                            (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <CategoryPicker type={type}></CategoryPicker>
                                    </FormControl>
                                    <FormDescription>
                                        Select a category for this transaction
                                    </FormDescription>
                                </FormItem>
                            )}>
                            </FormField>
                        </div>

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTransactionDialog

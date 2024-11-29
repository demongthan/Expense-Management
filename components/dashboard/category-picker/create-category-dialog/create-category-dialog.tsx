"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { CircleOff, PlusSquare } from 'lucide-react'

import { TransactionType, TransactionTypeDisplay } from '@/models/extension/transaction-type'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMutation } from '@tanstack/react-query'
import { CreateCategorySchema, CreateCategorySchemaType } from './schema-category'
import { CreateCategory } from './action-category'
import { CategoryDto } from '@/models/category/category-dto'
import { toast } from '@/components/ui/use-toast'

interface Props{
    type:TransactionType
}

const CreateCategoryDialog = ({type}:Props) => {
    const [open, setOpen]=useState<boolean>(false);

    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            name: "",
            icon: "",
            type: TransactionType.Income
        },
    })

    function onSubmit(values: CreateCategorySchemaType) {
        console.log(values)
    }

    const {mutate, isPending}=useMutation({
        mutationFn:CreateCategory,
        onSuccess: (data:CategoryDto) => {
            form.reset({
                name: "",
                icon: "",
                type: TransactionType.Income
            })

            toast({
                description: "Your message has been sent.",
            })

            setOpen((prev)=>!prev);
        },
        onError: (error) => {}
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
                    <DialogTitle>
                        Create {" "}
                        <span className={cn("m-1", type===TransactionType.Income?"text-emerald-500":"text-red-500")}>{TransactionTypeDisplay[type]}</span>
                        {" "} category
                    </DialogTitle>
                    <DialogDescription>
                        Categories are used to group your transactions
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={""} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Transaction description (optional)
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button variant={"outline"} className='h-[100px] w-full'>
                                                    {form.watch("icon")?(
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <span className='text-5xl' role='img'>{field.value}</span>
                                                            <p className='text-xs text-muted-foreground'>Click to select</p>
                                                        </div>
                                                    ):(
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <CircleOff className='h-[48px] w-[48px]'></CircleOff>
                                                            <p className='text-xs text-muted-foreground'>Click to select</p>
                                                        </div>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-full'>
                                                <Picker
                                                    data={data}
                                                    onEmojiSelect={(emoji:{native:string})=>{
                                                        field.onChange(emoji.native)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear in the app
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant={"secondary"} onClick={()=>{
                            form.reset();
                        }}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategoryDialog

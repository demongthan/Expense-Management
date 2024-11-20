import { Button } from '@/components/ui/button'
import { CircleDollarSign, HandCoins, HandHeart } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='h-full bg-background'>
            <div className='border-b bg-card'>
                <div className='container flex flex-wrap items-center justify-between gap-6 py-8'>
                    <p className='text-3xl font-bold'>Hello, NamNV57 <HandHeart className='inline-block text-yellow-400'/></p>

                    <div className='flex items-center gap-3'>
                        <Button variant={"outline"}
                        className='border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white'>
                            New income <CircleDollarSign className='ml-2' />
                        </Button>

                        <Button variant={"outline"}
                         className='border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white'>
                            New Expense <HandCoins className='ml-2'/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

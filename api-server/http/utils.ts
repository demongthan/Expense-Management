import { cookies } from 'next/headers'
import { twMerge } from 'tailwind-merge'
import jwt from 'jsonwebtoken'
import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'

import { toast } from '@/components/ui/use-toast'
import { EntityError } from './http'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const handleErrorApi = ({error, setError, duration}: {error: any, setError?: UseFormSetError<any>, duration?: number}) => {
    if (error instanceof EntityError && setError) {
        error.payload.errors.forEach((item:any) => {
            setError(item.field, {
                type: 'server',
                message: item.message
            })
        })
    } else {
        toast({
            title: 'Lỗi',
            description: error?.payload?.message ?? 'Lỗi không xác định',
            variant: 'destructive',
            duration: duration ?? 5000
        })
    }
}

export const normalizePath = (path: string) => {
    return path.startsWith('/') ? path.slice(1) : path
}

export const decodeJWT = <Payload = any>(token: string) => {
    return jwt.decode(token) as Payload
}

export const getTokenFromCookies = (): string | null => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    return token || null
}
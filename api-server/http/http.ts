import envConfig from '@/config/config'

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined
}

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type EntityErrorPayload = {
    message: string
    errors: {
        field: string
        message: string
    }[]
}

export class HttpError extends Error {
    status: number
    payload: {message: string, [key: string]: any}
    constructor({ status, payload }: { status: number; payload: any }) {
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}

export class EntityError extends HttpError {
    status: 422
    payload: EntityErrorPayload
    constructor({status,payload}: {status: 422, payload: EntityErrorPayload}) {
        super({ status, payload })
        this.status = status
        this.payload = payload
    }
}


const request = async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    let body: FormData | string | undefined = undefined;

    if (options?.body instanceof FormData) {
        body = options.body
    }
    else if (options?.body) {
        body = JSON.stringify(options.body)
    }

    const baseHeaders: {[key: string]: string} =body instanceof FormData? {}: {'Content-Type': 'application/json'}

    const baseUrl =
    options?.baseUrl === undefined
        ? envConfig.NEXT_PUBLIC_API_ENDPOINT
        : options.baseUrl

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    console.log(fullUrl)

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        } as any,
        body,
        method
    })

    const payload: T = await res.json()
    const data = {
        status: res.status,
        payload
    }
    // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
    if (!res.ok) {
        if (res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError({
                status: ENTITY_ERROR_STATUS,
                payload: data.payload as unknown as EntityErrorPayload, // Explicit assertion
            });
        }
        else {
            throw new HttpError(data)
        }
    }
    return data
}

const http = {
    get<T>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<T>('GET', url, options)
    },
    post<T>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<T>('POST', url, { ...options, body })
    },
    put<T>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<T>('PUT', url, { ...options, body })
    },
    delete<T>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<T>('DELETE', url, { ...options })
    }
}

export default http

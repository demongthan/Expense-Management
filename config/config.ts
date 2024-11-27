import { z } from 'zod'

const configSchema = z.object({
})

const configProject = configSchema.safeParse({
})

if (!configProject.success) {
    console.error(configProject.error.issues)
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}
  
const envConfig = configProject.data
export default envConfig
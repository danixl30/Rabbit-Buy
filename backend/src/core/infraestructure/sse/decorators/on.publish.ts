import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const OnPublish = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const response = context.switchToHttp().getResponse()
        return (data: object) => {
            const text = JSON.stringify(data)
            response.write(text)
        }
    },
)

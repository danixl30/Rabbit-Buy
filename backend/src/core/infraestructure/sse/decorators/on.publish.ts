import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { jsonToString } from 'src/utils/object-methods/object.methods'

export const OnPublish = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const response = context.switchToHttp().getResponse()
        return (data: object) => {
            const text = jsonToString(data)
            response.write(text)
        }
    },
)

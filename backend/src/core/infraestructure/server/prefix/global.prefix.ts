import { INestApplication } from '@nestjs/common'

export const configPrefix = (app: INestApplication) => {
    app.setGlobalPrefix('api')
}

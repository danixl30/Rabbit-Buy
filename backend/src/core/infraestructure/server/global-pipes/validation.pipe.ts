import { INestApplication, ValidationPipe } from '@nestjs/common'

export const configValidationPipe = (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe())
}

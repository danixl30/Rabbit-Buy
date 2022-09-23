import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 4000

const configSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('RabbirFood docs')
        .setDescription('RabbirFood API docs')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
}

const configCors = (app: INestApplication) => {
    app.enableCors()
}

const configPrefix = (app: INestApplication) => {
    app.setGlobalPrefix('api')
}

const configValidationPipe = (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe())
}

const createServer = async () => await NestFactory.create(AppModule)

const runServer = async (app: INestApplication, port: number | string) => {
    await app.listen(port)
}

async function bootstrap() {
    const app = await createServer()
    configCors(app)
    configPrefix(app)
    configValidationPipe(app)
    configSwagger(app)
    runServer(app, PORT)
}
bootstrap()

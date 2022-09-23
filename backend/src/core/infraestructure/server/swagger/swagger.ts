import {INestApplication} from "@nestjs/common"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"

export const configSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('RabbirFood docs')
        .setDescription('RabbirFood API docs')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
}

import {INestApplication} from "@nestjs/common"

export const configCors = (app: INestApplication) => {
    app.enableCors()
}

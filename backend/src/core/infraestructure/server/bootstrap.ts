import { AppModule } from '../application-module/app.module'
import { configCors } from './cors/cors'
import { createServer } from './create-server/create.server'
import { configValidationPipe } from './global-pipes/validation.pipe'
import { PORT } from './port/port'
import { configPrefix } from './prefix/global.prefix'
import { runServer } from './run/run.server'
import { configSwagger } from './swagger/swagger'

export default async function bootstrap() {
    const app = await createServer(AppModule)
    configCors(app)
    configPrefix(app)
    configValidationPipe(app)
    configSwagger(app)
    runServer(app, PORT)
}

import {Client} from "src/client/domain/client";
import {ClientEmail} from "src/client/domain/value-objects/client.email";
import {ClientId} from "src/client/domain/value-objects/client.id";
import {ClientName} from "src/client/domain/value-objects/client.name";
import {EventHandler} from "src/core/application/event-handler/event.handler";
import {ApplicationService} from "src/core/application/service/application.service";
import {RegisterUserApplicationService} from "src/user/application/services/register-user/register.user.application.service";
import {RegisterUserServiceDTO} from "src/user/application/services/register-user/types/register.user.dto";
import {RegisterUserServiceResponse} from "src/user/application/services/register-user/types/register.user.response";

export class RegisterClientApplicationService implements ApplicationService<RegisterUserServiceDTO, RegisterUserServiceResponse> {
    constructor(
        private eventHandler: EventHandler,
        private createUserService: RegisterUserApplicationService
    ) {}

    async execute(data: RegisterUserServiceDTO): Promise<RegisterUserServiceResponse> {
        const res = await this.createUserService.execute(data)
        const client = new Client(
            new ClientId(res.id),
            new ClientName(data.username),
            new ClientEmail(data.email),
        )
        this.eventHandler.publish(client.pullEvents())
        return res
    }
}

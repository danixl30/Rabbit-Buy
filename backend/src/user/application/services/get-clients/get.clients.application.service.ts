import { ApplicationService } from 'src/core/application/service/application.service'
import { UserRepository } from '../../repositories/user.repository'
import { GetClientsQueryFactory } from './queries/get.clients.query'
import { GetClientsResponse } from './types/response'

export class GetClientsApplicationService
    implements ApplicationService<unknown, GetClientsResponse>
{
    constructor(private userRepository: UserRepository) {}

    async execute(_?: unknown): Promise<GetClientsResponse> {
        const clients = await this.userRepository.getAll(
            new GetClientsQueryFactory().create(),
        )
        return clients.map((e) => ({
            id: e.id.value,
            username: e.username.value,
            email: e.email.value,
        }))
    }
}

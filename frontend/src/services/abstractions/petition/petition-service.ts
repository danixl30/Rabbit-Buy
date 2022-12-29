import { MakePetition } from './dto/make-petition'
import { Petition } from './types/petition'

export type UsePetition = {
    make(token: string, dto: MakePetition): Promise<boolean>
    getClient(token: string, page: number): Promise<Petition[]>
    getClientTerm(
        token: string,
        page: number,
        term: string,
    ): Promise<Petition[]>
    getFranchise(token: string, page: number): Promise<Petition[]>
    getFranchiseTerm(
        token: string,
        page: number,
        term: string,
    ): Promise<Petition[]>

    confirmPetition(token: string, id: string): Promise<boolean>
    suspendPetition(token: string, id: string): Promise<boolean>
    cancelPetition(token: string, id: string): Promise<boolean>
    finishPetition(token: string, id: string): Promise<boolean>
}

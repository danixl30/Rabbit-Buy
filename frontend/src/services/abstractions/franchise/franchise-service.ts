import { CreateFranchise } from './dto/create-franchise'
import { Franchise } from './types/franchise'
import { FranchiseDetail } from './types/franchise-detail'

export type UseFranchise = {
    create(token: string, dto: CreateFranchise): Promise<boolean>
    getAll(token: string): Promise<Franchise[]>
    getDetail(token: string, id: string): Promise<FranchiseDetail>
}

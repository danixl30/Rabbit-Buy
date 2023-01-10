import { ChangeFranchiseImageDTO } from './dto/change-image'
import { ChangeFranchiseName } from './dto/change-name'
import { CreateFranchise } from './dto/create-franchise'
import { Franchise } from './types/franchise'
import { FranchiseDetail } from './types/franchise-detail'

export type UseFranchise = {
    create(token: string, dto: CreateFranchise): Promise<boolean>
    getAll(): Promise<Franchise[]>
    getDetail(token: string, id: string): Promise<FranchiseDetail>
    generateGroupId(token: string, franchise: string): Promise<boolean>
    delete(token: string, franchise: string): Promise<boolean>
    changeName(token: string, dto: ChangeFranchiseName): Promise<boolean>
    changeImage(taken: string, dto: ChangeFranchiseImageDTO): Promise<void>
}

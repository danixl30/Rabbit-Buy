import { CreateFranchise } from './dto/create-franchise'

export type UseFranchise = {
    create(token: string, dto: CreateFranchise): Promise<boolean>
}

import { MakePetition } from './dto/make-petition'

export type UsePetition = {
    make(token: string, dto: MakePetition): Promise<boolean>
}

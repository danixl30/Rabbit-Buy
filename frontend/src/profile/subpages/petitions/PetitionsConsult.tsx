import { Button, Center, SimpleGrid, Text } from '@mantine/core'
import { ChangeEvent, useState } from 'react'
import { SearchInput } from '../../../components/SearchInput'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { getUserContext } from '../../../global-state/user/get-user-context'
import { Petition } from '../../../services/abstractions/petition/types/petition'
import { usePetition } from '../../../services/implementations/petition/usePetition'
import { PetitionCard } from './components/PetitionCard'
import { usePetitionsSubPage } from './hooks/usePetitionsSubPage'

const petitionsTest: Petition[] = [
    {
        name: 'test1',
        quantity: 1,
        status: 'OPEN',
        price: 1000,
        id: '1',
        client: {
            name: 'client1',
            email: 'client1@mail.com',
        },
        currency: 'USD',
    },
    {
        name: 'test1',
        quantity: 1,
        status: 'OPEN',
        price: 1000,
        id: '1',
        currency: 'USD',
    },
    {
        name: 'test1',
        quantity: 1,
        status: 'OPEN',
        price: 1000,
        id: '1',
        client: {
            name: 'client1',
            email: 'client1@mail.com',
        },
        currency: 'USD',
    },
    {
        name: 'test1',
        quantity: 1,
        status: 'OPEN',
        price: 1000,
        id: '1',
        currency: 'USD',
    },
]

export default function PetitionConsult() {
    const { petitions, onSubmit, isTop, onGetMore } = usePetitionsSubPage(
        usePetition(useAxiosHttp()),
        useCookieSession(),
        getUserContext()!!,
    )
    const [input, setInput] = useState('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
        setInput(e.target.value)

    const onSubmitInput = () => onSubmit(input)
    return (
        <>
            <Center>
                <SimpleGrid cols={1}>
                    <Text size={50}>Consultar pedidos</Text>
                    <SearchInput
                        value={input}
                        onChange={onChangeInput}
                        submit={onSubmitInput}
                    />
                    {petitions.map((e) => (
                        <div key={e.id}>
                            <PetitionCard {...e} />
                        </div>
                    ))}
                    {!isTop && <Button onClick={onGetMore}>Obtener mas</Button>}
                </SimpleGrid>
            </Center>
        </>
    )
}

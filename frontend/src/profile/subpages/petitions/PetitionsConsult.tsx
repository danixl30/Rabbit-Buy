import { Center, SimpleGrid, Text } from '@mantine/core'
import { SearchInput } from '../../../components/SearchInput'
import { Petition } from '../../../services/abstractions/petition/types/petition'
import { PetitionCard } from './components/PetitionCard'

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
    return (
        <>
            <Center>
                <SimpleGrid cols={1}>
                    <Text size={50}>Consultar pedidos</Text>
                    <SearchInput />
                    {petitionsTest.map((e) => (
                        <PetitionCard {...e} />
                    ))}
                </SimpleGrid>
            </Center>
        </>
    )
}

import { Button, Center, SimpleGrid, Text } from '@mantine/core'
import { ChangeEvent, useState } from 'react'
import { SearchInput } from '../../../components/SearchInput'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { getUserContext } from '../../../global-state/user/get-user-context'
import { usePetition } from '../../../services/implementations/petition/usePetition'
import { ConfirmPetitionButton } from './components/ConfirmPetitionButton'
import { PetitionCard } from './components/PetitionCard'
import { usePetitionsSubPage } from './hooks/usePetitionsSubPage'

export default function PetitionConsult() {
    const userState = getUserContext()
    const { petitions, onSubmit, isTop, onGetMore, confirmPetition } =
        usePetitionsSubPage(
            usePetition(useAxiosHttp()),
            useCookieSession(),
            userState!!,
        )
    const [input, setInput] = useState('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
        setInput(e.target.value)

    const onSubmitInput = () => onSubmit(input)

    const onClickConfirm = (id: string) => () => {
        confirmPetition(id)
    }

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
                            {userState?.user?.role === 'PROVIDER' &&
                            e.status !== 'CONFIRMED' ? (
                                <PetitionCard
                                    extraData={
                                        <ConfirmPetitionButton
                                            onClick={onClickConfirm(e.id)}
                                        />
                                    }
                                    {...e}
                                />
                            ) : (
                                <PetitionCard {...e} />
                            )}
                        </div>
                    ))}
                    {!isTop && <Button onClick={onGetMore}>Obtener mas</Button>}
                </SimpleGrid>
            </Center>
        </>
    )
}

import { Button, Center, Select, SimpleGrid, Text } from '@mantine/core'
import { ChangeEvent, useState } from 'react'
import { SearchInput } from '../../../components/SearchInput'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { getUserContext } from '../../../global-state/user/get-user-context'
import { usePetition } from '../../../services/implementations/petition/usePetition'
import { Dicctionary } from '../../../utils/types/dicctionary'
import { PetitionCard } from './components/PetitionCard'
import { SliderItem } from './components/StatusSlider'
import { usePetitionsSubPage } from './hooks/usePetitionsSubPage'

export default function PetitionConsult() {
    const userState = getUserContext()
    const {
        petitions,
        onSubmit,
        isTop,
        onGetMore,
        confirmPetition,
        finishPetition,
        cancelPetition,
        suspendPetition,
    } = usePetitionsSubPage(
        usePetition(useAxiosHttp()),
        useCookieSession(),
        userState!!,
    )
    const [input, setInput] = useState('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
        setInput(e.target.value)

    const onSubmitInput = () => onSubmit(input)

    const changeHandler = (id: string) => (acction: string) => {
        const acctions: Dicctionary<() => void | Promise<void>> = {
            Confirmar: () => confirmPetition(id),
            Suspender: () => suspendPetition(id),
            Finalizar: () => finishPetition(id),
            Cancelar: () => cancelPetition(id),
        }
        acctions[acction]?.()
    }

    const getPossibleStuses = (status: string, id: string) => {
        if (status === 'CANCELLED' || status === 'FINISHED') return []
        if (status === 'OPEN')
            return [
                {
                    label: 'Confirmar',
                    value: 'Confirmar',
                    onClick: () => confirmPetition(id),
                },
                {
                    label: 'Cancelar',
                    value: 'Cancelar',
                    onClick: () => cancelPetition(id),
                },
            ]
        if (status === 'SUSPENDED')
            return [
                {
                    label: 'Confirmar',
                    value: 'Confirmar',
                    onClick: () => confirmPetition(id),
                },
                {
                    label: 'Cancelar',
                    value: 'Cancelar',
                    onClick: () => cancelPetition(id),
                },
            ]
        return [
            {
                label: 'Finalizar',
                value: 'Finalizar',
                onClick: () => finishPetition(id),
            },
            {
                label: 'Cancelar',
                value: 'Cancelar',
                onClick: () => cancelPetition(id),
            },
            {
                label: 'Suspender',
                value: 'Suspender',
                onClick: () => suspendPetition(id),
            },
        ]
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
                            {userState?.user?.role === 'PROVIDER' ? (
                                <PetitionCard
                                    extraData={
                                        <Select
                                            placeholder="Selecciona una accion..."
                                            itemComponent={SliderItem}
                                            data={getPossibleStuses(
                                                e.status,
                                                e.id,
                                            )}
                                            onChange={changeHandler(e.id)}
                                        />
                                    }
                                    {...e}
                                />
                            ) : (
                                <PetitionCard
                                    extraData={
                                        <>
                                            {e.status !== 'CANCELLED' &&
                                                e.status !== 'FINISHED' && (
                                                    <Button
                                                        onClick={() =>
                                                            cancelPetition(e.id)
                                                        }
                                                    >
                                                        Cancelar
                                                    </Button>
                                                )}
                                        </>
                                    }
                                    {...e}
                                />
                            )}
                        </div>
                    ))}
                    {!isTop && <Button onClick={onGetMore}>Obtener más</Button>}
                </SimpleGrid>
            </Center>
        </>
    )
}

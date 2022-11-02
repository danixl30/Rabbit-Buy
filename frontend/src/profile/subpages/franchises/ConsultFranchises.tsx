import { Center, Loader, SimpleGrid, Text } from '@mantine/core'
import { ModalLayout } from '../../../components/ModalLayout'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { useToastToastify } from '../../../core/implementation/toast/toastify/useToastToastify'
import { Franchise } from '../../../services/abstractions/franchise/types/franchise'
import { useFranchise } from '../../../services/implementations/franchise/useFranchise'
import { FranchiseCard } from './components/FranchiseCard'
import { useConsultFranchise } from './hooks/useConsultFranchises'

export default function ConsultFranchises() {
    const { franchise, franchises, onCloseDetail, loading, onClickFranchise } =
        useConsultFranchise(
            useFranchise(useAxiosHttp()),
            useCookieSession(),
            useToastToastify(),
        )

    const onClickCard = (e: Franchise) => () => onClickFranchise(e)

    if (loading) {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }

    return (
        <>
            <ModalLayout
                opened={Boolean(franchise)}
                title="Detalle de franquicia"
                onClose={onCloseDetail}
            >
                <Text>{`Nombre: ${franchise?.name}`}</Text>
                <Text>{`RIF: ${franchise?.rif}`}</Text>
                <Text>{`ID de afiliación: ${franchise?.groupId}`}</Text>
            </ModalLayout>
            <Text size={50}>Consultar franquicias</Text>
            <SimpleGrid cols={2}>
                {franchises.map((e) => (
                    <div key={e.id}>
                        <FranchiseCard onClick={onClickCard(e)} {...e} />
                    </div>
                ))}
            </SimpleGrid>
        </>
    )
}

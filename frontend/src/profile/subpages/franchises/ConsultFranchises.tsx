import { Center, Loader, SimpleGrid, Space, Text } from '@mantine/core'
import { ChangeEvent } from 'react'
import { ImageInput } from '../../../components/ImageInput'
import { ModalLayout } from '../../../components/ModalLayout'
import { TextInputView } from '../../../components/TextInputView'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { useToastToastify } from '../../../core/implementation/toast/toastify/useToastToastify'
import { FranchiseImage } from '../../../franchise-create/components/FranchiseImage'
import { NameInput } from '../../../franchise-create/components/NameInput'
import { useImage } from '../../../hooks/useImage'
import { Franchise } from '../../../services/abstractions/franchise/types/franchise'
import { useFranchise } from '../../../services/implementations/franchise/useFranchise'
import { ChangeButton } from '../user-profile/components/ChangeButton'
import { FranchiseCard } from './components/FranchiseCard'
import { useConsultFranchise } from './hooks/useConsultFranchises'

export default function ConsultFranchises() {
    const {
        franchise,
        franchises,
        onCloseDetail,
        loading,
        onClickFranchise,
        name,
        onChangeName,
        errorName,
        image,
        onChangeImage,
    } = useConsultFranchise(
        useFranchise(useAxiosHttp()),
        useCookieSession(),
        useToastToastify(),
    )

    const { imageText } = useImage(image)

    const onClickCard = (e: Franchise) => () => onClickFranchise(e)

    const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeName(e.target.value)

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
                <NameInput
                    value={name}
                    onChange={onChangeNameInput}
                    error={errorName}
                />
                <Center>
                    <Space h="md" />
                    <ChangeButton disabled={!name || Boolean(errorName)} />
                </Center>
                <TextInputView label="RIF:" value={franchise?.rif || ''} />
                <TextInputView
                    label="ID de afiliación:"
                    value={franchise?.groupId || ''}
                />
                <Center>
                    <Space h="md" />
                    <ChangeButton disabled={false} />
                </Center>
                <ImageInput onChange={onChangeImage} />
                {imageText && (
                    <>
                        <Space h="xl" />
                        <FranchiseImage src={imageText} />
                    </>
                )}
                <Center>
                    <Space h="md" />
                    <ChangeButton disabled={!image} />
                </Center>
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

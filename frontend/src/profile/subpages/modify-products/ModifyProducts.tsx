import { Button, Center, Loader, SimpleGrid, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { DeleteButton } from '../../../components/DeleteButton'
import { ImageInput } from '../../../components/ImageInput'
import { ModalLayout } from '../../../components/ModalLayout'
import { useAxiosHttp } from '../../../core/implementation/http/axios/useAxiosHttp'
import { useCookieSession } from '../../../core/implementation/session/cookies/useCookieSession'
import { useToastToastify } from '../../../core/implementation/toast/toastify/useToastToastify'
import { DescriptionInput } from '../../../create-product/components/DescriptionInput'
import { ExistenceInput } from '../../../create-product/components/ExistenceInput'
import { NameInput } from '../../../create-product/components/NameInput'
import { PriceInput } from '../../../create-product/components/PriceInput'
import { ProductImage } from '../../../create-product/components/ProductImage'
import { useImage } from '../../../hooks/useImage'
import { ProductCard } from '../../../main/components/ProductCard'
import { SkeletonLoading } from '../../../main/components/SkeletonLoading'
import { useProductServiceHttp } from '../../../services/implementations/product/useProductHttp'
import { ChangeButton } from '../user-profile/components/ChangeButton'
import { ModifyProductsTitle } from './components/ModifyProductsTitle'
import { useModifyProducts } from './hooks/useModifyProducts'

export default function ModifyProducts() {
    const {
        products,
        loading,
        incrementPage,
        errorName,
        name,
        description,
        price,
        existence,
        image,
        selectProduct,
        isTop,
        onChangeName,
        onChangeImage,
        onChangePrice,
        onChangeExistence,
        onChangeDescription,
        openModal,
        closeModal,
        onClickDelete,
        onClickChangeName,
        onClickChangeImage,
        onClickChangePrice,
        onClickChangeExistence,
        onClickChangeDescription,
    } = useModifyProducts(
        useCookieSession(),
        useProductServiceHttp(useAxiosHttp()),
        useToastToastify(),
    )

    const { imageText } = useImage(image)

    const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeName(e.target.value)
    const onChangeDescriptionInput = (e: ChangeEvent<HTMLTextAreaElement>) =>
        onChangeDescription(e.target.value)

    if (products.length === 0 && loading) return <SkeletonLoading />

    return (
        <>
            <ModalLayout
                title="Modificar producto"
                opened={openModal}
                onClose={closeModal}
            >
                <SimpleGrid cols={1}>
                    <NameInput
                        value={name}
                        onChange={onChangeNameInput}
                        error={errorName}
                    />
                    <ChangeButton
                        onClick={onClickChangeName}
                        disabled={!name || Boolean(errorName)}
                    />
                    <DescriptionInput
                        value={description}
                        onChange={onChangeDescriptionInput}
                    />
                    <Center>
                        <ChangeButton
                            disabled={false}
                            onClick={onClickChangeDescription}
                        />
                    </Center>
                    <PriceInput value={price} onChange={onChangePrice} />
                    <ChangeButton
                        onClick={onClickChangePrice}
                        disabled={price < 0}
                    />
                    <ExistenceInput
                        value={existence}
                        onChange={onChangeExistence}
                    />
                    <ChangeButton
                        onClick={onClickChangeExistence}
                        disabled={existence < 0}
                    />
                    <ImageInput onChange={onChangeImage} />
                    {imageText && (
                        <>
                            <Space h="xl" />
                            <ProductImage src={imageText} />
                        </>
                    )}
                    <Center>
                        <ChangeButton
                            onClick={onClickChangeImage}
                            disabled={!image}
                        />
                    </Center>
                    <Center>
                        <DeleteButton onClick={onClickDelete} />
                    </Center>
                </SimpleGrid>
            </ModalLayout>
            <Center>
                <SimpleGrid cols={1}>
                    <Center>
                        <ModifyProductsTitle />
                    </Center>
                    <Space h="xl" />
                    <SimpleGrid cols={2}>
                        {products.map((e) => (
                            <ProductCard
                                onClick={() => selectProduct(e)}
                                {...e}
                            />
                        ))}
                    </SimpleGrid>
                    {!isTop && (
                        <>
                            {!loading ? (
                                <Button onClick={incrementPage}>
                                    Obtener más
                                </Button>
                            ) : (
                                <Loader />
                            )}
                        </>
                    )}
                </SimpleGrid>
            </Center>
        </>
    )
}

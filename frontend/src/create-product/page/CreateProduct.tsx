import { ChangeEvent } from 'react'
import { Center, SimpleGrid, Space } from '@mantine/core'
import { FormCard } from '../../components/FormCard'
import { useToastToastify } from '../../core/implementation/toast/toastify/useToastToastify'
import { CreateButton } from '../../franchise-create/components/CreateButton'
import { CreateProductTitle } from '../components/CreateProductTitle'
import { useCreateProduct } from '../hooks/useCreateProduct'
import { NameInput } from '../components/NameInput'
import { DescriptionInput } from '../components/DescriptionInput'
import { PriceInput } from '../components/PriceInput'
import { CurrencyInput } from '../components/CurrencyInput'
import { ExistenceInput } from '../components/ExistenceInput'
import { ImageInput } from '../../components/ImageInput'
import { useImage } from '../hooks/useImage'
import { ProductImage } from '../components/ProductImage'

export default function CreateProduct() {
    const {
        name,
        description,
        price,
        image,
        existence,
        currency,
        onChangeName,
        onChangeImage,
        onChangePrice,
        onChangeCurrency,
        onChangeExistence,
        onChangeDescription,
    } = useCreateProduct(useToastToastify())
    const { imageText } = useImage(image)

    const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeName(e.target.value)
    const onChangeCurrencyInput = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeCurrency(e.target.value)
    const onChangeDescriptionInput = (e: ChangeEvent<HTMLTextAreaElement>) =>
        onChangeDescription(e.target.value)

    return (
        <>
            <Center>
                <FormCard>
                    <Center>
                        <CreateProductTitle />
                    </Center>
                    <Space h="xl" />
                    <SimpleGrid cols={1}>
                        <NameInput value={name} onChange={onChangeNameInput} />
                        <DescriptionInput
                            value={description}
                            onChange={onChangeDescriptionInput}
                        />
                        <SimpleGrid cols={2}>
                            <PriceInput
                                value={price}
                                onChange={onChangePrice}
                            />
                            <CurrencyInput
                                value={currency}
                                onChange={onChangeCurrencyInput}
                            />
                        </SimpleGrid>
                        <ExistenceInput
                            value={existence}
                            onChange={onChangeExistence}
                        />
                        <ImageInput onChange={onChangeImage} />
                    </SimpleGrid>
                    {imageText && (
                        <>
                            <Space h="xl" />
                            <ProductImage src={imageText} />
                        </>
                    )}
                    <Space h="xl" />
                    <Center>
                        <CreateButton onClick={() => {}} disabled />
                    </Center>
                </FormCard>
            </Center>
        </>
    )
}

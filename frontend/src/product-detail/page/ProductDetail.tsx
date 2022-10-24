import { Container, Loader, Space, Title } from '@mantine/core'
import { useAxiosHttp } from '../../core/implementation/http/axios/useAxiosHttp'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { useProductServiceHttp } from '../../services/implementations/product/useProductHttp'
import { Item } from '../components/Item'
import { MakePetitionButton } from '../components/MakePetitionButton'
import { ProductContainer } from '../components/ProductContainer'
import { ProductDescription } from '../components/ProductDescription'
import { ProductFranchise } from '../components/ProductFranchise'
import { ProductImage } from '../components/ProductImage'
import { ProductName } from '../components/ProductName'
import { ProductPrice } from '../components/ProductPrice'
import { QuantityInput } from '../components/QuantityInput'
import { useProductDetail } from '../hooks/useProductDetail'

export default function ProductDetailPage() {
    const { product, isLoading, isError } = useProductDetail(
        useRouterDomNavigation(),
        useProductServiceHttp(useAxiosHttp()),
    )
    if (isLoading)
        return (
            <>
                <Loader />
            </>
        )
    return (
        <>
            <Container>
                <Title order={1}>Product detail:</Title>
                <ProductContainer>
                    <Item span={4}>
                        <ProductImage src={product!!.image} />
                    </Item>
                    <Item span={4}>
                        <ProductName text={product!!.name} />
                        <Space h="xl" />
                        <ProductDescription text={product!!.description} />
                    </Item>
                    <Item span={1}>
                        <ProductFranchise name={product!!.franchise.name} />
                        <Space h="md" />
                        <ProductPrice
                            price={product!!.price}
                            currency={product!!.currency}
                        />
                        <Space h="md" />
                        <QuantityInput
                            disabled={product!!.existence < 1}
                            quantity={product!!.existence}
                        />
                        <Space h="md" />
                        <MakePetitionButton
                            disabled={product!!.existence < 1}
                        />
                    </Item>
                </ProductContainer>
            </Container>
        </>
    )
}

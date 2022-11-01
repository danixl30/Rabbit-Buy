import { Center, Container, Loader, Space, Title } from '@mantine/core'
import { Layout } from '../../components/Layout'
import { useAxiosHttp } from '../../core/implementation/http/axios/useAxiosHttp'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { useCookieSession } from '../../core/implementation/session/cookies/useCookieSession'
import { useToastToastify } from '../../core/implementation/toast/toastify/useToastToastify'
import { ErrorComponent } from '../../error/ErrorComponent'
import { getUserContext } from '../../global-state/user/get-user-context'
import { usePetition } from '../../services/implementations/petition/usePetition'
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
import { SkeletonLoading } from '../components/SkeletonLoading'
import { useProductDetail } from '../hooks/useProductDetail'

export default function ProductDetailPage() {
    const {
        product,
        isLoading,
        isError,
        quantity,
        onMakePetition,
        onChangeQuantity,
    } = useProductDetail(
        useRouterDomNavigation(),
        useProductServiceHttp(useAxiosHttp()),
        usePetition(useAxiosHttp()),
        useToastToastify(),
        useCookieSession(),
    )

    const userState = getUserContext()

    if (isLoading) return <SkeletonLoading />

    if (isError) return <ErrorComponent />

    return (
        <>
            <Layout>
                <Container>
                    <Title order={1}>Detalle del producto:</Title>
                    <ProductContainer>
                        <Item span={4}>
                            <ProductImage src={product!!.image} />
                        </Item>
                        <Item span={4}>
                            <ProductName text={product!!.name} />
                            <Space h="xl" />
                            <ProductDescription text={product!!.description} />
                        </Item>
                        <Item span={2}>
                            <ProductFranchise name={product!!.franchise.name} />
                            <Space h="md" />
                            <ProductPrice
                                price={product!!.price}
                                currency={product!!.currency}
                            />
                            <Space h="md" />
                            <QuantityInput
                                disabled={
                                    product!!.existence < 1 ||
                                    !userState?.user ||
                                    userState?.user?.role !== 'USER'
                                }
                                quantity={product!!.existence}
                                value={quantity}
                                onChange={onChangeQuantity}
                            />
                            <Space h="md" />
                            <MakePetitionButton
                                disabled={
                                    product!!.existence < 1 ||
                                    !userState?.user ||
                                    userState?.user?.role !== 'USER'
                                }
                                onClick={onMakePetition}
                            />
                        </Item>
                    </ProductContainer>
                </Container>
            </Layout>
        </>
    )
}

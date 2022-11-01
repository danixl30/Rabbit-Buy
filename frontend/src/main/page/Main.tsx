import { Button, Center, Loader, Space } from '@mantine/core'
import { ChangeEvent } from 'react'
import { Layout } from '../../components/Layout'
import { SearchInput } from '../../components/SearchInput'
import { useAxiosHttp } from '../../core/implementation/http/axios/useAxiosHttp'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { ErrorComponent } from '../../error/ErrorComponent'
import { useProductServiceHttp } from '../../services/implementations/product/useProductHttp'
import { List } from '../components/List'
import { ProductCard } from '../components/ProductCard'
import { ProductList } from '../components/ProductList'
import { SkeletonLoading } from '../components/SkeletonLoading'
import { useMainPage } from '../hooks/useMainPage'

export default function MainPage() {
    const {
        onClickShowMore,
        isLoading,
        isError,
        products,
        isTop,
        onChangeInputSearch,
        onSubmitSearch,
        inputSearch,
        onClickProduct,
    } = useMainPage(
        useRouterDomNavigation(),
        useProductServiceHttp(useAxiosHttp()),
    )

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeInputSearch(e.target.value)
    }

    if (isLoading && products.length === 0) return <SkeletonLoading />

    if (isError) return <ErrorComponent />

    return (
        <>
            <Layout>
                <Center>
                    <List>
                        <SearchInput
                            value={inputSearch}
                            onChange={onChangeInput}
                            submit={onSubmitSearch}
                        />
                        <Space h="xl" />
                        <ProductList>
                            {products.map((e) => (
                                <div key={e.id}>
                                    <ProductCard
                                        onClick={() => onClickProduct(e)}
                                        {...e}
                                    />
                                </div>
                            ))}
                        </ProductList>
                        {!isTop && products.length >= 10 && (
                            <>
                                {!isLoading ? (
                                    <Button onClick={onClickShowMore}>
                                        Obtener más
                                    </Button>
                                ) : (
                                    <Loader />
                                )}
                            </>
                        )}
                    </List>
                </Center>
            </Layout>
        </>
    )
}

import { Button, Center, Input, Loader, Space } from '@mantine/core'
import { ChangeEvent, KeyboardEvent } from 'react'
import { useAxiosHttp } from '../../core/implementation/http/axios/useAxiosHttp'
import { useRouterDomNavigation } from '../../core/implementation/navigation/navigation-router-dom'
import { useProductServiceHttp } from '../../services/implementations/product/useProductHttp'
import { List } from '../components/List'
import { ProductCard } from '../components/ProductCard'
import { ProductList } from '../components/ProductList'
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

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSubmitSearch()
    }

    if (isLoading && !products)
        return (
            <>
                <Loader />
            </>
        )

    return (
        <>
            <Center>
                <List>
                    <Input
                        onKeyPress={onKeyPress}
                        value={inputSearch}
                        placeholder="Buscar"
                        onChange={onChangeInput}
                    />
                    <Space h="xl" />
                    <ProductList>
                        {products.map((e) => (
                            <div key={e.id}>
                                <ProductCard
                                    name={e.name}
                                    id={e.id}
                                    price={e.price}
                                    currency={e.currency}
                                    image={e.image}
                                    onClick={() => onClickProduct(e)}
                                />
                            </div>
                        ))}
                    </ProductList>
                    {!isTop && (
                        <>
                            {!isLoading ? (
                                <Button onClick={onClickShowMore}>
                                    Obtener mas
                                </Button>
                            ) : (
                                <Loader />
                            )}
                        </>
                    )}
                </List>
            </Center>
        </>
    )
}

import { Module } from '@nestjs/common'
import { FranchiseModule } from 'src/franchise/infraestructure/modules/franchise.module'
import { ProductModule } from 'src/product/infraestructure/modules/product.module'
import { ProviderModule } from 'src/provider/infraestructure/modules/provider.module'
import { UserModule } from 'src/user/infraestructure/module/user.module'

@Module({
    imports: [UserModule, FranchiseModule, ProviderModule, ProductModule],
})
export class ControllersModule {}

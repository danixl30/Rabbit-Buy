import { Module } from '@nestjs/common'
import { FranchiseModule } from 'src/franchise/infraestructure/modules/franchise.module'
import { ProviderModule } from 'src/provider/infraestructure/modules/provider.module'
import { UserModule } from 'src/user/infraestructure/module/user.module'

@Module({
    imports: [UserModule, FranchiseModule, ProviderModule],
})
export class ControllersModule {}

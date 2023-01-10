import { Criteria } from 'src/core/application/repository/query/criteria'
import { FieldName } from 'src/core/application/repository/query/field.name'
import { FieldValue } from 'src/core/application/repository/query/field.value'
import { Filter } from 'src/core/application/repository/query/filter'
import { FilterOperator } from 'src/core/application/repository/query/filter.operator'
import { LogicalOperator } from 'src/core/application/repository/query/logical.operator'
import { LogicalOperators } from 'src/core/application/repository/query/logical.operators'
import { Operator } from 'src/core/application/repository/query/operator'
import { Order } from 'src/core/application/repository/query/order'
import { OrderField } from 'src/core/application/repository/query/order.field'
import { OrderType } from 'src/core/application/repository/query/order.type'
import { OrderTypes } from 'src/core/application/repository/query/order.types'
import { Pagination } from 'src/core/application/repository/query/pagination'
import { FranchiseRef } from 'src/petition/domain/value-objects/franchise.ref'
import { Factory } from 'src/utils/factory/factory'

export class FindPetitionsFranchiseQueryFactory implements Factory<Criteria> {
    constructor(
        private clientId: FranchiseRef,
        private page = 0,
        private offset = 10,
    ) {}

    create(): Criteria {
        return new Criteria(
            new LogicalOperator(
                [
                    new Filter(
                        new FieldName('franchise'),
                        new FieldValue(this.clientId.value.value),
                        new FilterOperator(Operator.EQUAL),
                    ),
                ],
                LogicalOperators.AND,
            ),
            [new Order(new OrderField('date'), new OrderType(OrderTypes.DESC))],
            new Pagination(this.page, this.offset),
        )
    }
}

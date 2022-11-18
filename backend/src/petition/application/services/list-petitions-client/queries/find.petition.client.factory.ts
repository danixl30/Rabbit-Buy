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
import { UserRef } from 'src/petition/domain/value-objects/user.ref'
import { Factory } from 'src/utils/factory/factory'

export class FindPetitionsClientQueryFactory implements Factory<Criteria> {
    constructor(
        private clientId: UserRef,
        private page = 1,
        private offset = 10,
    ) {}

    create(): Criteria {
        return new Criteria(
            new LogicalOperator(
                [
                    new Filter(
                        new FieldName('client'),
                        new FieldValue(this.clientId.value.value),
                        new FilterOperator(Operator.EQUAL),
                    ),
                ],
                LogicalOperators.AND,
            ),
            [new Order(new OrderField('date'), new OrderType(OrderTypes.DESC))],
            new Pagination(this.offset, this.page),
        )
    }
}

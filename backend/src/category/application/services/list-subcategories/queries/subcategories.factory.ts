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
import { Factory } from 'src/utils/factory/factory'

export class FindSubCategoriesQueryFactory implements Factory<Criteria> {
    constructor(private parent: string) {}
    create(): Criteria {
        return new Criteria(
            new LogicalOperator(
                [
                    new Filter(
                        new FieldName('parent'),
                        new FieldValue(this.parent),
                        new FilterOperator(Operator.EQUAL),
                    ),
                ],
                LogicalOperators.AND,
            ),
            [new Order(new OrderField('name'), new OrderType(OrderTypes.DESC))],
        )
    }
}

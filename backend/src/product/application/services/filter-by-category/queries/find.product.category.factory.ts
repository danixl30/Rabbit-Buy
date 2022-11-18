import { Criteria } from 'src/core/application/repository/query/criteria'
import { FieldName } from 'src/core/application/repository/query/field.name'
import { FieldValue } from 'src/core/application/repository/query/field.value'
import { Filter } from 'src/core/application/repository/query/filter'
import { FilterOperator } from 'src/core/application/repository/query/filter.operator'
import { LogicalOperator } from 'src/core/application/repository/query/logical.operator'
import { LogicalOperators } from 'src/core/application/repository/query/logical.operators'
import { Operator } from 'src/core/application/repository/query/operator'
import { Pagination } from 'src/core/application/repository/query/pagination'
import { CategoryRef } from 'src/product/domain/value-objects/category.ref'
import { Factory } from 'src/utils/factory/factory'

export class FindProductsCategoryQueryFactory implements Factory<Criteria> {
    constructor(
        private category: CategoryRef,
        private page = 0,
        private offset = 10,
    ) {}

    create(): Criteria {
        return new Criteria(
            new LogicalOperator(
                [
                    new Filter(
                        new FieldName('category'),
                        new FieldValue(this.category.value.value),
                        new FilterOperator(Operator.EQUAL),
                    ),
                ],
                LogicalOperators.AND,
            ),
            [],
            new Pagination(this.page, this.offset),
        )
    }
}

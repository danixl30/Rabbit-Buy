import { Criteria } from 'src/core/application/repository/query/criteria'
import { FieldName } from 'src/core/application/repository/query/field.name'
import { FieldValue } from 'src/core/application/repository/query/field.value'
import { Filter } from 'src/core/application/repository/query/filter'
import { FilterOperator } from 'src/core/application/repository/query/filter.operator'
import { LogicalOperator } from 'src/core/application/repository/query/logical.operator'
import { LogicalOperators } from 'src/core/application/repository/query/logical.operators'
import { Operator } from 'src/core/application/repository/query/operator'
import { Pagination } from 'src/core/application/repository/query/pagination'
import { FranchiseRef } from 'src/product/domain/value-objects/franchise.ref'
import { Factory } from 'src/utils/factory/factory'

export class FindProductsFranchiseQueryFactory implements Factory<Criteria> {
    constructor(
        private franchise: FranchiseRef,
        private term: string = '',
        private page = 0,
        private offset = 10,
    ) {}

    create(): Criteria {
        return new Criteria(
            new LogicalOperator(
                [
                    new Filter(
                        new FieldName('franchise'),
                        new FieldValue(this.franchise.value.value),
                        new FilterOperator(Operator.CONTAINS),
                    ),
                    new LogicalOperator(
                        [
                            new Filter(
                                new FieldName('productName'),
                                new FieldValue(this.term),
                                new FilterOperator(Operator.CONTAINS),
                            ),
                            new Filter(
                                new FieldName('description'),
                                new FieldValue(this.term),
                                new FilterOperator(Operator.CONTAINS),
                            ),
                        ],
                        LogicalOperators.OR,
                    ),
                ],
                LogicalOperators.AND,
            ),
            [],
            new Pagination(this.page, this.offset),
        )
    }
}

import { Criteria } from 'src/core/application/repository/query/criteria'
import { LogicalOperator } from 'src/core/application/repository/query/logical.operator'
import { LogicalOperators } from 'src/core/application/repository/query/logical.operators'
import { Pagination } from 'src/core/application/repository/query/pagination'
import { Factory } from 'src/utils/factory/factory'

export class FindProductsQueryFactory implements Factory<Criteria> {
    constructor(private page = 0, private offset = 10) {}

    create(): Criteria {
        return new Criteria(
            new LogicalOperator([], LogicalOperators.AND),
            [],
            new Pagination(this.page, this.offset),
        )
    }
}

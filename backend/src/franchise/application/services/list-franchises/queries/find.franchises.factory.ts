import { Criteria } from 'src/core/application/repository/query/criteria'
import { LogicalOperator } from 'src/core/application/repository/query/logical.operator'
import { LogicalOperators } from 'src/core/application/repository/query/logical.operators'
import { Pagination } from 'src/core/application/repository/query/pagination'
import { Factory } from 'src/utils/factory/factory'

export class FindFranchisesQueryFactory implements Factory<Criteria> {
    constructor(private page = 0, private limit = 0) {}

    create(): Criteria {
        return new Criteria(
            new LogicalOperator([], LogicalOperators.AND),
            [],
            new Pagination(this.page, this.limit),
        )
    }
}

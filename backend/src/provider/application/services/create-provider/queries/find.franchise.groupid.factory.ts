import { Criteria } from 'src/core/application/repository/query/criteria'
import { FieldName } from 'src/core/application/repository/query/field.name'
import { FieldValue } from 'src/core/application/repository/query/field.value'
import { Filter } from 'src/core/application/repository/query/filter'
import { FilterOperator } from 'src/core/application/repository/query/filter.operator'
import { LogicalOperator } from 'src/core/application/repository/query/logical.operator'
import { LogicalOperators } from 'src/core/application/repository/query/logical.operators'
import { Operator } from 'src/core/application/repository/query/operator'
import { FranchiseGroupId } from 'src/franchise/domain/value-objects/franchise.group.id'
import { Factory } from 'src/utils/factory/factory'

export class FindFranchiseGroupIdQueryFactory implements Factory<Criteria> {
    constructor(private groupId: FranchiseGroupId) {}

    create(): Criteria {
        return new Criteria(
            new LogicalOperator(
                [
                    new Filter(
                        new FieldName('groupId'),
                        new FieldValue(this.groupId.value),
                        new FilterOperator(Operator.EQUAL),
                    ),
                ],
                LogicalOperators.AND,
            ),
        )
    }
}

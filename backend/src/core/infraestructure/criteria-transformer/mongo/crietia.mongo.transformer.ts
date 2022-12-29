import { Injectable } from '@nestjs/common'
import { Criteria } from 'src/core/application/repository/query/criteria'
import { Filter } from 'src/core/application/repository/query/filter'
import { LogicalOperator } from 'src/core/application/repository/query/logical.operator'
import { LogicalOperators } from 'src/core/application/repository/query/logical.operators'
import { Operator } from 'src/core/application/repository/query/operator'
import { Order } from 'src/core/application/repository/query/order'
import { OrderTypes } from 'src/core/application/repository/query/order.types'
import { objectAppend } from 'src/utils/object-methods/object.methods'

type MongoFilterOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$regex'
type MongoFilterValue = boolean | string | number
type MongoFilterOperation = {
    [operator in MongoFilterOperator]?: MongoFilterValue
}
type MongoFilter =
    | { [field: string]: MongoFilterOperation }
    | { [field: string]: { $not: MongoFilterOperation } }
    | { ['$or']: MongoFilter[] }
type MongoDirection = 1 | -1
type MongoSort = { [field: string]: MongoDirection }

interface MongoQuery {
    filter: MongoFilter
    sort: MongoSort
    skip: number
    limit: number
}

const OperationReducer = {
    [Operator.EQUAL]: (filter: Filter) => ({
        [filter.field.value]: { $eq: filter.value.value },
    }),
    [Operator.NOT_EQUAL]: (filter: Filter) => ({
        [filter.field.value]: { $ne: filter.value.value },
    }),
    [Operator.LOWER_THAN]: (filter: Filter) => ({
        [filter.field.value]: { $lt: filter.value.value },
    }),
    [Operator.GROWER_THAN]: (filter: Filter) => ({
        [filter.field.value]: { $gt: filter.value.value },
    }),
    [Operator.CONTAINS]: (filter: Filter) => ({
        [filter.field.value]: { $regex: filter.value.value },
    }),
    [Operator.NOT_CONTAINS]: (filter: Filter) => ({
        [filter.field.value]: { $not: { $regex: filter.value.value } },
    }),
}

@Injectable()
export class CriteriaMongoTransformer {
    private getObject(item: LogicalOperator | Filter): MongoFilter {
        if (item instanceof Filter) {
            return OperationReducer[item.operator.value]?.(item) || {}
        }
        if (item.operator === LogicalOperators.OR) {
            return { $or: item.elements.map(this.getObject.bind(this)) }
        }
        if (item.operator === LogicalOperators.AND) {
            const result = item.elements.map(this.getObject.bind(this))
            return objectAppend({}, ...(result as MongoFilter[]))
        }
        return {}
    }
    protected generateSort(order: Order): MongoSort {
        return {
            [order.field.value === 'id' ? '_id' : order.field.value]:
                order.type.value === OrderTypes.ASC ? 1 : -1,
        }
    }

    transform(criteria: Criteria): MongoQuery {
        const orders = criteria.order.map(this.generateSort)
        return {
            filter: this.getObject(criteria.operator),
            sort: objectAppend({}, ...orders),
            skip: (criteria.pagination.page - 1) * criteria.pagination.offset,
            limit: criteria.pagination.offset,
        }
    }
}

import { MessageChat } from 'src/chat/domain/message/value-objects/message.chat'
import { ChatFranchise } from 'src/chat/domain/value-objects/chat.franchise'
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
import { Factory } from 'src/utils/factory/factory'

export class FindChatMessagesQueryFactory implements Factory<Criteria> {
    constructor(
        private chat: MessageChat,
        private page: number = 1,
        private offset = 20,
    ) {}
    create(): Criteria {
        return new Criteria(
            new LogicalOperator(
                [
                    new Filter(
                        new FieldName('chat'),
                        new FieldValue(this.chat.value.value),
                        new FilterOperator(Operator.EQUAL),
                    ),
                ],
                LogicalOperators.AND,
            ),
            [
                new Order(
                    new OrderField('timestamp'),
                    new OrderType(OrderTypes.DESC),
                ),
            ],
            new Pagination(this.page, this.offset),
        )
    }
}

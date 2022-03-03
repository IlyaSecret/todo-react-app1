import List from 'antd/lib/list'
import React from 'react'
import Alert from 'antd/lib/alert'
import { useTodosQuery } from './todoApiHooks'
import { TodoItem } from './TodoItem'

export const TodoList: React.FC = React.memo(() => {
    const {
        data: todos,
        isLoading,
        isError,
        error
    } = useTodosQuery()

    if (isError)
        return <Alert type='error' description={error?.message} />

    return <List
        bordered
        loading={isLoading}
        dataSource={todos}
        renderItem={item => <TodoItem todo={item} />}
    />
})
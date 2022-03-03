import List from 'antd/lib/list'
import { LoadableCheckbox } from 'components/LoadableCheckbox'
import { Todo } from 'models/Todo'
import React from 'react'
import { DeleteTodoButton } from './DeleteTodoButton'
import { useSaveTodoMutation } from './todoApiHooks'

export const TodoItem: React.FC<{
    todo: Todo
}> = React.memo(({ todo }) => {

    const saveMutation = useSaveTodoMutation()

    return <List.Item>
        <List.Item.Meta
            avatar={<LoadableCheckbox
                loading={saveMutation.isLoading}
                checked={todo.completed}
                onChange={(e) => {
                    saveMutation.mutateAsync({
                        ...todo,
                        completed: e.target.checked
                    })
                }}
            />}
            title={todo.title}
        />
        <DeleteTodoButton id={todo.id} />
    </List.Item>
})
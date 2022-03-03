import axios, { AxiosError } from "axios"
import delay from "delay"
import { Todo } from "models/Todo"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const useTodosQuery = () => {
    return useQuery<Todo[], AxiosError>('todos', async () => {
        const res = await axios.get<Todo[]>('/todos')
        return res.data
    })
}

export const useSaveTodoMutation = () => {
    const queryClient = useQueryClient()

    return useMutation('todo', async (data: Todo) => {
        await delay(1000)
        const res = await axios.request({
            method: data.id ? 'put' : 'post',
            url: `/todos/${data.id ? data.id : ''}`,
            data
        })
        return res.data
    }, {
        onSuccess(data, vars) {
            queryClient.setQueryData<Todo[]>('todos', todos => {
                const isNew = !vars.id
                if (isNew)
                    todos.push(data)
                else {
                    const index = todos.findIndex(t => t.id == vars.id)
                    todos[index] = data
                }
                return [...todos]
            })
        }
    })
}

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient()

    return useMutation<Todo, AxiosError<Todo>, number>('todo', async (id) => {
        await delay(2000)
        const res = await axios.delete(`/todos/${id}`)
        return res.data
    }, {
        onSuccess(data, id) {
            queryClient.setQueryData<Todo[]>('todos', todos => {                
                const index = todos.findIndex(t => t.id == id)
                todos.splice(index, 1)    
                return [...todos]
            })
        }
    })
}
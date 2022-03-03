import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import { Todo } from 'models/Todo'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSaveTodoMutation } from './todoApiHooks'
import { TodoForm } from './TodoForm'
 
export const AddTodoButton: React.FC = React.memo(()=>{
    const [visible, setVisible] = useState(false)    
    const form = useForm<Todo>() 

    useEffect(() => {
        form.reset()
    }, [visible])

    const saveMutation = useSaveTodoMutation()
    
    const onSubmit = async (data: Todo) => {
        await saveMutation.mutateAsync(data)
        setVisible(false)
    }

    return <>
        <Button onClick={() => setVisible(true)}>Добавить</Button>
        <Modal 
            visible={visible}
            onOk={() => {
                form.handleSubmit(onSubmit)()
            }}
            confirmLoading={saveMutation.isLoading}
            onCancel={() => setVisible(false)}>
            <FormProvider {...form}>
                <TodoForm />
            </FormProvider>
        </Modal>
    </>
})
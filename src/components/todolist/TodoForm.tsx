import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import { Todo } from 'models/Todo';
import React from 'react'
import { useController, useFormContext } from 'react-hook-form';
 
export const TodoForm: React.FC = React.memo(()=>{
    const form = useFormContext<Todo>()

    const nameControler = useController({
        name: 'title',
        control: form.control,
        rules: {
            required: 'Обязательное поле!'            
        }
    })

    return <Form>
        <Form.Item 
            label='Название'
            status={nameControler.fieldState.invalid ? 'error' : undefined}
            validateStatus={nameControler.fieldState.invalid ? 'error' : undefined}
            help={nameControler.fieldState.error?.message}>
            <Input {...nameControler.field} />
        </Form.Item>
    </Form>
})
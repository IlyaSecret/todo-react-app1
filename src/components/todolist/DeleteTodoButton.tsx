import Button from 'antd/lib/button'
import Popconfirm from 'antd/lib/popconfirm';
import React, { useState } from 'react'
import { useDeleteTodoMutation } from './todoApiHooks';

export const DeleteTodoButton: React.FC<{
    id: number;
}> = React.memo(({
    id
}) => {
    const [visible, setVisible] = useState(false)
    const deleteMutation = useDeleteTodoMutation()

    return <Popconfirm
        title="Удалить?"
        visible={visible}        
        onConfirm={async () => {
            setVisible(false)
            await deleteMutation.mutateAsync(id)            
        }}
        onCancel={() => setVisible(false)}
        okText="Yes"
        cancelText="No"
    >
        <Button
            onClick={() => {
               setVisible(true)
            }}
            loading={deleteMutation.isLoading}
        >Удалить</Button>
    </Popconfirm>
})
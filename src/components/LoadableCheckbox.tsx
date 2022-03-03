import Checkbox, { CheckboxProps } from 'antd/lib/checkbox'
import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
 
export const LoadableCheckbox: React.FC<    
    CheckboxProps & {
        loading?: boolean;
    }
> = React.memo(({ loading, ...props })=>{
    return <div style={{display: 'grid', placeItems: 'center'}}>
        <Checkbox disabled={loading} {...props} />
        {loading && <Spin style={{position: 'absolute'}} indicator={antIcon}></Spin>}
    </div>
})
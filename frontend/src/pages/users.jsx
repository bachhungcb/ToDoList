import {Table} from 'antd';
import { useEffect, useState } from 'react';
import { getUserApi } from '../util/api';

const UsersPage = () =>{
    const [dataSource, setDataSource] = useState([]);

    useEffect(()=>{
        const fetchUser = async () =>{
            const res = await getUserApi();
            if(res){
                setDataSource(res);
            }
        }
        fetchUser();
    }, []);

    const columns = [
    {
        title: 'Id',
        dataIndex: '_id',
        
    },
    {
        title: 'Email',
        dataIndex: 'email',
        
    },
    {
        title: 'Name',
        dataIndex: 'name',
        
    },
    {
        title: 'Role',
        dataIndex: 'role',
        
    },
    ];
      
      
    return (
        <div style={{padding: 30}}>
            <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey={'_id'}
            />
        </div>
    )
}

export default UsersPage;
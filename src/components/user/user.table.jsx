import { Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { fetchAllUSerAPI } from '../../services/api.service';

const UserTable = () => {
    const [dataUser, setDataUser] = useState([
        { _id: "eric", fullName: 25, email: "hn" },
        { _id: "hoidanit", fullName: 25, email: "hcm" }
    ]);

    const loadAllUser = async () => {
        const res = await fetchAllUSerAPI();
        // setDataUsers(res.data)
    }

    loadAllUser();


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];
    return (
        <Table columns={columns} dataSource={dataUser} />
    );
}
export default UserTable;
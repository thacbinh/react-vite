import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { fetchAllUSerAPI } from '../../services/api.service';

const UserTable = () => {
    const [dataUser, setDataUser] = useState([
        { _id: "eric", fullName: 25, email: "hn" },
        { _id: "hoidanit", fullName: 25, email: "hcm" }
    ]);

    useEffect(() => {
        console.log(">>> run render 111")
        loadAllUser();
    }, []);

    const loadAllUser = async () => {
        const res = await fetchAllUSerAPI();
        setDataUser(res.data)
    }

    console.log(">>> run render 000")


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
        <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
    );
}
export default UserTable;
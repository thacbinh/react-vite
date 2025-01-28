import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUSerAPI } from "../services/api.service";

const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        loadAllUser();
    }, []);

    const loadAllUser = async () => {
        const res = await fetchAllUSerAPI();
        setDataUser(res.data)
    }

    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadAllUser={loadAllUser} />
            <UserTable
                dataUser={dataUser}
                loadAllUser={loadAllUser}
            />
        </div>
    );
}

export default UserPage;
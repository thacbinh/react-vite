import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUSerAPI } from "../services/api.service";

const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadAllUser();
    }, []);

    const loadAllUser = async () => {
        const res = await fetchAllUSerAPI(current, pageSize);
        if (res.data) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadAllUser={loadAllUser} />
            <UserTable
                dataUser={dataUser}
                loadAllUser={loadAllUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    );
}

export default UserPage;
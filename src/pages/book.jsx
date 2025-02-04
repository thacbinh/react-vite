import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";

const BookPage = () => {
    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadAllBook();
    }, [current, pageSize])

    const loadAllBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setTotal(res.data.meta.total)
        }
    }
    return (
        <div style={{ padding: "20px" }}>
            <BookTable
                dataBook={dataBook}
                current={current}
                pageSize={pageSize}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                loadAllBook={loadAllBook}
                total={total}
            />
        </div>
    );
}

export default BookPage;
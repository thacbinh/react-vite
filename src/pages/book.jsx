import { useCallback, useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";

const BookPage = () => {
    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [loadingTable, setLoadingTable] = useState(false)

    useEffect(() => {
        loadAllBook();
    }, [current, pageSize])

    const loadAllBook = useCallback(async () => {
        setLoadingTable(true)
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setLoadingTable(false)
    }, [current, pageSize])
    useEffect(() => {
        loadAllBook();
    }, [loadAllBook])

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
                loadingTable={loadingTable}
            />
        </div>
    );
}

export default BookPage;
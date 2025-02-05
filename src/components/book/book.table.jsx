import { Button, notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateBookControl from "./create.book.control";
import CreateBookUnControl from "./create.book.uncontrol";
import UpdateBookControl from "./update.book.control";
import UpdateBookUnControl from "./update.book.uncontrol";
import { deleteBookAPI } from "../../services/api.service";

const BookTable = (props) => {
    const { dataBook, current, pageSize, setCurrent, setPageSize, total } = props

    const [isBookOpen, setIsBookOpen] = useState(false);
    const [bookDetail, setBookDetail] = useState(null);
    const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);
    const [isUpdateBookOpen, setIsUpdateBookOpen] = useState(false);
    const [bookUpdate, setBookUpdate] = useState(null);
    const { loadAllBook, loadingTable } = props;

    const confirmDelete = async (id) => {
        const res = await deleteBookAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete book",
                description: "Delete book thành công"
            })
            await loadAllBook();
        } else {
            notification.error({
                message: "Error delete book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record, index) => {
                return (
                    <a onClick={() => {
                        setIsBookOpen(true);
                        setBookDetail(record);
                    }}>{record._id}</a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(text)
            },
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setIsUpdateBookOpen(true);
                            setBookUpdate(record)
                        }}
                    />
                    <Popconfirm
                        title="Delete the book"
                        description="Are you sure to delete this book?"
                        onConfirm={() => confirmDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>

                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    }

    return (
        <>
            <div style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => { setIsCreateBookOpen(true) }}>Create Book</Button>
            </div>
            <Table
                dataSource={dataBook}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
                loading={loadingTable}
            />
            <ViewBookDetail
                isBookOpen={isBookOpen}
                setIsBookOpen={setIsBookOpen}
                bookDetail={bookDetail}
                setBookDetail={setBookDetail}
            />
            {/* <CreateBookControl
                isCreateBookOpen={isCreateBookOpen}
                setIsCreateBookOpen={setIsCreateBookOpen}
                loadAllBook={loadAllBook}
            /> */}
            <CreateBookUnControl
                isCreateBookOpen={isCreateBookOpen}
                setIsCreateBookOpen={setIsCreateBookOpen}
                loadAllBook={loadAllBook}
            />
            {/* <UpdateBookControl
                isUpdateBookOpen={isUpdateBookOpen}
                setIsUpdateBookOpen={setIsUpdateBookOpen}
                bookUpdate={bookUpdate}
                setBookUpdate={setBookUpdate}
                loadAllBook={loadAllBook}
            /> */}
            <UpdateBookUnControl
                isUpdateBookOpen={isUpdateBookOpen}
                setIsUpdateBookOpen={setIsUpdateBookOpen}
                bookUpdate={bookUpdate}
                setBookUpdate={setBookUpdate}
                loadAllBook={loadAllBook}
            />
        </>
    );
}
export default BookTable;
import { Button, Popconfirm, Table } from "antd";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateBookControl from "./create.book.control";
import CreateBookUnControl from "./create.book.uncontrol";

const BookTable = (props) => {
    const { dataBook, current, pageSize, setCurrent, setPageSize, total } = props

    const [isBookOpen, setIsBookOpen] = useState(false);
    const [bookDetail, setBookDetail] = useState(null);
    const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);
    const [bookCreate, setBookCreate] = useState(null);
    const { loadAllBook } = props;

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
                            // setIsModalBookOpen(true);
                            // setBookCreate(record)
                        }}
                    />
                    {/* <Popconfirm
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => confirmDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm> */}

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
        </>
    );
}
export default BookTable;
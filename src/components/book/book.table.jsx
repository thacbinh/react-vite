import { Button, Table } from "antd";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";

const BookTable = (props) => {
    const { dataBook, current, pageSize, setCurrent, setPageSize, total } = props

    const [isBookOpen, setIsBookOpen] = useState(false);
    const [bookDetail, setBookDetail] = useState(null);

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
                <Button type="primary">Create Book</Button>
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
        </>
    );
}
export default BookTable;
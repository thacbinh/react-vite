import { Drawer } from "antd";


const ViewBookDetail = (props) => {
    const { isBookOpen, setIsBookOpen, bookDetail, setBookDetail } = props
    return (
        <Drawer title="Basic Drawer" onClose={() => {
            setIsBookOpen(close);
            setBookDetail(null)
        }} open={isBookOpen}>
            {bookDetail ?
                <>
                    <p>Id: {bookDetail._id}</p>
                    <br />
                    <p>Tiêu đề: {bookDetail.mainText}</p>
                    <br />
                    <p>Tác giả: {bookDetail.author}</p>
                    <br />
                    <p>Thể loại: {bookDetail.category}</p>
                    <br />
                    <p>Giá tiền: {
                        new Intl.NumberFormat('vi-VN',
                            { style: 'currency', currency: 'VND' }).format(bookDetail.price)}
                    </p>
                    <br />
                    <p>Số lượng: {bookDetail.quantity}</p>
                    <br />
                    <p>Đã bán: {bookDetail.sold}</p>
                    <br />
                    <p>Thumbnail:</p>
                    <div style={{
                        marginTop: "10px",
                        height: "100px", width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetail.thumbnail}`} />
                    </div>
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>
    );
}

export default ViewBookDetail;
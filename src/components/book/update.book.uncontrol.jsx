import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookUnControl = (props) => {
    const [form] = Form.useForm();

    const { isUpdateBookOpen, setIsUpdateBookOpen, loadAllBook, bookUpdate, setBookUpdate } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (bookUpdate && bookUpdate._id) {
            form.setFieldsValue({
                id: bookUpdate._id,
                mainText: bookUpdate.mainText,
                author: bookUpdate.author,
                price: bookUpdate.price,
                quantity: bookUpdate.quantity,
                category: bookUpdate.category
            })

            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookUpdate.thumbnail}`)
        }
    }, [bookUpdate])


    const handleCancel = () => {
        form.resetFields();
        setBookUpdate(null)
        setIsUpdateBookOpen(false);
        setSelectedFile(null);
        setPreview(null);
    }
    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
        }
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    const handleUpdateBook = async (values) => {
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }
        let newThumbnail = "";
        if (!selectedFile && preview) {
            newThumbnail = bookUpdate.thumbnail;
        } else {

            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                //success
                newThumbnail = resUpload.data.fileUploaded;

                //step 2: update user
            } else {
                //false
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }
        }
        await updateBook(newThumbnail, values);
    }

    const updateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;

        const resUpdateBook = await updateBookAPI(
            newThumbnail, id, mainText, author, price, quantity, category
        );

        if (resUpdateBook.data) {
            handleCancel();
            await loadAllBook()

            notification.success({
                message: "Update book",
                description: "Cập nhập book thành công"
            })
        }

        else {
            notification.error({
                message: "Error create book",
                description: JSON.stringify(resUpdateBook.message)
            })
        }
    }
    return (
        <>
            <Modal title="Update Book"
                open={isUpdateBookOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                maskClosable={false}
                okText={"UPDATE"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateBook}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Id"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tiêu Đề"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mainText!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tác Giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your author!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá Tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={' đ'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số Lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your quantity!',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Thể Loại"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your category!',
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>
                    <div>
                        <label htmlFor='btnUpload' style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                            Upload Avatar
                        </label>
                        <input type='file' hidden id='btnUpload' onChange={onSelectFile}
                            //khi tat di chon lai anh do, no ko thay doi anhr => ko co onChange , phai xet no bang null 
                            onClick={(event) => event.target.value = null}
                            style={{ display: "none" }}
                        />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height: "100px", width: "150px",
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                        </>
                    }
                </Form>

            </Modal>
        </>
    );
}
export default UpdateBookUnControl;
import { Col, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookUnControl = (props) => {
    const [form] = Form.useForm();

    const { isCreateBookOpen, setIsCreateBookOpen, loadAllBook } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);


    const handleCancel = () => {
        form.resetFields();
        setIsCreateBookOpen(false);
        setSelectedFile(null);
        setPreview(null);
    }
    const onSelectFile = (e) => {
        if (!e.target.files && e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
        }
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    const handleCreateBook = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }
        const resUpload = await handleUploadFile(selectedFile, "book");

        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;

            const { mainText, author, price, quantity, category } = values;

            const resCreateBook = await createBookAPI(
                newAvatar, mainText, author, price, quantity, category
            );

            if (resCreateBook.data) {
                handleCancel();
                setPreview(null);
                await loadAllBook()

                notification.success({
                    message: "Create book",
                    description: "Tạo mới book thành công"
                })
            }

            else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resCreateBook.message)
                })
            }

            //step 2: update user
        } else {
            //false
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    return (
        <>
            <Modal title="Create Book"
                open={isCreateBookOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                maskClosable={false}
                okText={"CREATE"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreateBook}
                // onFinishFailed={onFinishFailed}
                >
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
export default CreateBookUnControl;
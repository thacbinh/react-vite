import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookControl = (props) => {
    const { isCreateBookOpen, setIsCreateBookOpen, loadAllBook } = props;

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);


    const handleCancel = () => {
        setIsCreateBookOpen(false);
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
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
    const handleCreateBook = async () => {
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
                onOk={handleCreateBook}
                onCancel={handleCancel}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tiêu Đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => { setMainText(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Tác Giả</span>
                        <Input
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Giá Tiền</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={' đ'}
                            value={price}
                            onChange={(event) => { setPrice(event) }}
                        />
                    </div>
                    <div>
                        <span>Số Lượng</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            value={quantity}
                            onChange={(event) => { setQuantity(event) }}
                        />
                    </div>
                    <div>
                        <span>Thể Loại</span>
                        <Select
                            value={category}
                            style={{ width: "100%" }}
                            onChange={(value) => { setCategory(value) }}
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
                    </div>
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
                </div>
            </Modal>
        </>
    );
}
export default CreateBookControl;
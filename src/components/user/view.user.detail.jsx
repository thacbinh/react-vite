import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';
const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadAllUser
    } = props;

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = e.target.files[0];
        // I've kept this example simple by using the first image instead of multiple
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }

    }

    console.log(">>> check file: ", preview)
    console.log(">>> check file: ", selectedFile)

    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");

        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;

            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone
            );

            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadAllUser()

                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công"
                })
            }

            else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpload.message)
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
        <Drawer
            width={'40vw'}
            title="Chi tiết User"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ?
                <>
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar</p>
                    <div style={{
                        marginTop: "10px",
                        height: "100px", width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
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
                        <input type='file' hidden id='btnUpload' onChange={onSelectFile} />
                    </div>

                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height: "100px", width: "150px",
                                border: "1px solid #ccc"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                            <Button type='primary' onClick={() => handleUpdateUserAvatar()}>Save</Button>
                        </>
                    }
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>
    )
}
export default ViewUserDetail;
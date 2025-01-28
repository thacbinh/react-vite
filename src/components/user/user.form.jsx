import { Button, Input, message, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handleOnClickBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Success"
            })
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
        console.log(">>>>My data:", res.data.data)

    }
    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Full Name</span>
                    <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                </div>
                <div>
                    <span>Email</span>
                    <Input value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table User</h3>
                    <Button onClick={handleOnClickBtn} type="primary"> Create User </Button>
                </div>
            </div>
        </div>
    );

}

export default UserForm;
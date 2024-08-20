import React, { useState } from "react";
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import admins from '../../api/admin';
import styles from './styles.module.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();

    const [adminData, setAdminData] = useState({
        login: '',
        password: ''
    });

    const handleInputAdmin = e => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    }

    const login = async () => {
        try {
            const loginRes = await admins.login(adminData);

            localStorage.setItem('admin', JSON.stringify({
                id: loginRes.id,
                username: loginRes.username
            }));

            sessionStorage.setItem('token', loginRes.token);

            navigate('/home');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.container}>
            <Input.Label label={'Nome ou email'} vertical value={adminData.login} handleOnInput={handleInputAdmin} placeholder={'Melissa Rodrigues'} name={'login'} />
            <Input.Label label={'Senha'} type={'password'} vertical value={adminData.password} handleOnInput={handleInputAdmin} placeholder={'*******'} name={'password'} />

            <Button.Default handleOnClick={login}>Entrar</Button.Default>
        </div>
    )
}
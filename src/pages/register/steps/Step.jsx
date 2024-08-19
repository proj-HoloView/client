import React, { useState } from "react";
import styles from './styles.module.css';
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import viacep from '../../../api/viacep';

function One(props) {
    const [adminData, setAdminData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleAdminInput = e => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    }

    const sendPost = () => {
        props.setAdminData(adminData);
        props.setFormStep(2);
    }

    return (
        <div className={styles.container}>
            <Input.Label value={adminData.email} handleOnInput={handleAdminInput} name='email' label='E-mail' placeholder='MelissaRodrigues@gmail.com' vertical labelGap='.1rem' />
            <Input.Label value={adminData.username} handleOnInput={handleAdminInput} name='username' label='Nome de usuário' placeholder='Melissa Rodrigues' vertical labelGap='.1rem' />
            <Input.Label value={adminData.password} handleOnInput={handleAdminInput} name='password' type='password' label='Senha' placeholder='********' vertical labelGap='.1rem' />

            <Button.Default handleOnClick={sendPost}>Cadastrar administrador</Button.Default>
        </div>
    );
}

function Two(props) {
    const [cepNotFound, setCepNotFound] = useState(false);

    const [addressData, setAddressData] = useState({
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        zipCode: ''
    });

    const [shopData, setShopData] = useState({
        name: ''
    });

    const handleOnInputCep = async e => {
        const cep = e.target.value;

        if (cep.length < 8) return;

        try {
            const res = await viacep(cep);

            setAddressData({
                ...addressData,
                street: res.logradouro,
                district: res.bairro,
                city: res.localidade,
                zipCode: cep
            });
        } catch (e) {
            setCepNotFound(true);
        }
    }

    const handleAddressInput = e => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    }

    const sendPost = () => {
        props.setShopData(shopData);
        props.setAddressData(addressData);
    }

    return (
        <div className={styles.container}>
            <Input.Label label='Nome da loja' placeholder='Saint Paul' vertical labelGap='.1rem' handleOnInput={e => setShopData({ name: e.target.value })} value={shopData.name} />
            <Input.Label borderColor={cepNotFound ? 'red' : 'black'} handleOnInput={handleOnInputCep} maxLength={8} label='CEP' placeholder='01310-930' vertical labelGap='.1rem' />
            <Input.Label label='Número' placeholder='1B' vertical labelGap='.1rem' value={addressData.number} name={'number'} handleOnInput={handleAddressInput} />
            <Input.Label label='Complemento' placeholder='Apto 110' vertical labelGap='.1rem' name={'complement'} handleOnInput={handleAddressInput} value={addressData.complement} />
            <Input.Label disabled label='Logradouro' placeholder='Avenida paulista' vertical labelGap='.1rem' value={addressData.street} />
            <Input.Label disabled label='Cidade' placeholder='São Paulo' value={addressData.city} vertical labelGap='.1rem' />
            <Input.Label disabled label='Bairro' placeholder='Guaianases' value={addressData.district} vertical labelGap='.1rem' />

            <Button.Default handleOnClick={sendPost}>Cadastrar loja</Button.Default>
        </div>
    );
}

const Steps = {
    One,
    Two
}

export default Steps;
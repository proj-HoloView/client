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

    const handleInputShopName = e => {
        setShopData({ name: e.target.value });
    }

    const inputs = [
        {
            label: 'Nome da loja',
            placeholder: 'Saint Paul',
            handleOnInput: handleInputShopName,
            value: shopData.name
        },
        {
            label: 'CEP',
            placeholder: '01310-930',
            handleOnInput: handleOnInputCep,
            borderColor: cepNotFound ? 'red' : 'black',
            maxLength: 8
        },
        {
            label: 'Número',
            placeholder: '1B',
            handleOnInput: handleAddressInput,
            value: addressData.number,
            name: 'number'
        },
        {
            label: 'Complemento',
            placeholder: 'Apto 110',
            handleOnInput: handleAddressInput,
            value: addressData.complement,
            name: 'complement'
        },
        {
            label: 'Logradouro',
            placeholder: 'Avenida paulista',
            handleOnInput: handleAddressInput,
            value: addressData.street,
            disabled: true
        },
        {
            label: 'Cidade',
            placeholder: 'São Paulo',
            handleOnInput: handleAddressInput,
            value: addressData.city,
            disabled: true
        },
        {
            label: 'Bairro',
            placeholder: 'Guaianases',
            handleOnInput: handleAddressInput,
            value: addressData.district,
            disabled: true
        }
    ];

    return (
        <div className={styles.container}>
            {
                inputs.map(input => {
                    return <Input.Label key={input.label} label={input.label} placeholder={input.placeholder} vertical labelgap='.1rem' handleOnInput={input.handleOnInput} disabled={input.disabled} name={input.name} value={input.value} maxLength={input.maxLength} />
                })
            }

            <Button.Default handleOnClick={sendPost}>Cadastrar loja</Button.Default>
        </div>
    );
}

const Steps = {
    One,
    Two
}

export default Steps;
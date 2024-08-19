import React, { useEffect, useState } from "react";
import Steps from "./steps/Step";
import admin from '../../api/admin';
import shop from '../../api/shop';
import { useLocation } from "react-router-dom";

export default function Register() {
    const [formStep, setFormStep] = useState(1);

    const [adminData, setAdminData] = useState(null);

    const [shopData, setShopData] = useState(null);

    const [addressData, setAddressData] = useState(null);

    let location = useLocation();

    useEffect(() => {
        const postShop = async () => {
            try {
                const res = await shop.post(shopData);

                return res.id;
            } catch (e) {
                console.log(e);
            }
        }

        const postAdmin = async shopId => {
            const res = await admin.post({ ...adminData, shopId });

            return res;
        }

        const registerChain = async () => {
            const shopId = await postShop();
            localStorage.setItem('shopId', shopId);

            const admin = await postAdmin(shopId);
            localStorage.setItem('adminId', admin.id);
            localStorage.setItem('adminUsername', admin.username);
            sessionStorage.setItem('token', admin.token);
        }

        if (adminData && shopData && addressData) {
            try {
                registerChain();
                location('/home');
            } catch (e) {
                console.log(e);
            }
        }
    }, [adminData, shopData, addressData, location])


    function Form() {
        switch (formStep) {
            case 1:
                return <Steps.One setAdminData={setAdminData} setFormStep={setFormStep} />

            case 2:
                return <Steps.Two setShopData={setShopData} setAddressData={setAddressData} />

            default:
                return <h1>Erro ao buscar formulário</h1>
        }
    }

    return (
        <Form />
    )
}
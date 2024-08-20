import React, { useEffect, useState } from "react";
import Steps from "./steps/Step";
import admin from '../../api/admin';
import { useNavigate } from "react-router-dom";

export default function Register() {
    let navigate = useNavigate();

    // fase do formulário
    const [formStep, setFormStep] = useState(1);
    // informações de administrador
    const [adminData, setAdminData] = useState(null);
    // informações de loja
    const [shopData, setShopData] = useState(null);
    // informações de endereço de loja
    const [addressData, setAddressData] = useState(null);

    // useeffect responsável pela verificação de informações de admin, loja e endereço preenchidas para realizar o post
    useEffect(() => {
        const registerChain = async () => {
            const registerBody = {
                admin: adminData,
                shop: shopData
            }

            // try responsávle pelo post das informações e captura e armazenamento de info de administrador, token e loja retornas
            try {
                const registerRes = await admin.postShop(registerBody);

                localStorage.setItem('admin', JSON.stringify({
                    id: registerRes.admin.id,
                    username: registerRes.admin.username
                }));

                sessionStorage.setItem('token', registerRes.admin.token);

                localStorage.setItem('shop', JSON.stringify({
                    id: registerRes.shop.id,
                    name: registerRes.shop.name
                }));

                navigate('/home');
            } catch (e) {
                // caso haja erro no cadastro, o formulário retorna para a primeira fase
                setFormStep(1);
            }
        }

        if (adminData && shopData && addressData) {
            registerChain();
        }
    }, [adminData, shopData, addressData, navigate])

    // sub-componente de formulário, responsável pela decisão de passo do formulário a ser apresentado
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

    // Retorno final do componente
    return <Form />
}
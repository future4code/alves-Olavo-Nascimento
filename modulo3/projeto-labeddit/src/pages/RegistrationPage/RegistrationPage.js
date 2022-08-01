import React, { useState } from "react";
import * as S from './styled-Registration'
import Header from "../../componets/header/Header";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { goToFeedPage } from "../../routes/cordinator";
import useUnProtectedPage from "../../hooks/useUnProtectedPage";
import { postSignup } from "../../services/app-access/app-access";

const RegistrationPage = () => {
    useUnProtectedPage()
    const navigate = useNavigate()
    const [loading, setLoading] = useState()
    const { form, onChange, cleanFields } = useForm({
        username: "",
        email: "",
        password: ""
    })

    const onSubmit = (event) => {
        setLoading(true)
        event.preventDefault()
        postSignup(form, setLoading, goToFeedPage, navigate)
        cleanFields()
    }

    return (
        <div>
            <Header />
            <S.DivLogin>
                <S.TextHello>Olá, boas vindas ao LabEddit ;)</S.TextHello>
                <S.TextHello>Registrar-se</S.TextHello>
                {loading ? (<p>Criando conta, aguarde...</p>) :
                    <S.FormRegistration onSubmit={onSubmit} >
                        <input
                            placeholder="Nome de usuário"
                            type='text'
                            required
                            value={form.username}
                            name={"username"}
                            onChange={onChange}
                            pattern={"^.{6,}"}
                            title={"Mínimo seis caracteres"}
                        />
                        <input
                            placeholder="E-mail"
                            type='email'
                            required
                            value={form.email}
                            name={"email"}
                            onChange={onChange}
                        />
                        <input
                            placeholder="Senha"
                            type='password'
                            required
                            value={form.password}
                            name={"password"}
                            onChange={onChange}
                            pattern={"^.{8,}"}
                            title={"Mínimo oito caracteres"}
                        />
                        <S.TextContract> Ao continuar, você concorda com o nosso Contrato de usuário e nossa Política de Privacidade.</S.TextContract>
                        <S.ConteinerAgree>
                            <S.InputAgree type="checkbox" required />
                            <S.TextContract>Eu concordo em receber emails sobre coisas legais no Labeddit</S.TextContract>
                        </S.ConteinerAgree>
                        <S.Botons >Criar conta</S.Botons>
                    </S.FormRegistration>
                }
            </S.DivLogin>
        </div>
    )
}

export default RegistrationPage


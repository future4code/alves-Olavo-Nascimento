import React, { useState } from "react";
import * as S from './styled-Login'
import Header from "../../componets/header/Header";
import useForm from "../../hooks/useForm";
import { goToRegistrationPage, goToFeedPage } from "../../routes/cordinator";
import { useNavigate } from "react-router-dom";
import Logo_labeedit from '../../assets/imagens/logo-labeddit.png'
import { postLogin } from "../../services/app-access/app-access";
import useUnProtectedPage from "../../hooks/useUnProtectedPage";

const LoginPage = () => {
  useUnProtectedPage()
  const navigate = useNavigate()
  const [loading, setLoading] = useState()
  const { form, onChange, cleanFields } = useForm({
    email: "",
    password: ""
  })

  const onSubmit = (event) => {
    event.preventDefault()
    cleanFields()
    postLogin(form, setLoading, goToFeedPage, navigate)
  }

  return (
    <div>
      <Header />
      <>
        <S.DivLogin>
          <S.ImgLogo src={Logo_labeedit} />
          <S.TextoLogo>O projeto de rede social da Labenu</S.TextoLogo>
          {loading ? (<p>Aguarde...</p>) :
            (
              <S.FormLogin onSubmit={onSubmit} >
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
                  maxLength={15}
                  title={"Mínimo oito caracteres"}
                />
                <S.Botons>Enviar</S.Botons>
              </S.FormLogin>
            )
          }
          <S.Botons onClick={() => goToRegistrationPage(navigate)} >Criar sua conta</S.Botons>
        </S.DivLogin>
      </>
    </div>
  )
}

export default LoginPage


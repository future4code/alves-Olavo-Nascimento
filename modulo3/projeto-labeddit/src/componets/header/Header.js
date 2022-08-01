import { useNavigate } from "react-router-dom"
import { goToFeedPage, goToLoginPage } from '../../routes/cordinator'
import { useState } from "react"
import * as S from './styled-header'
import Icone_Logo from '../../assets/imagens/icone-logo.png'

const Header = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [logoutButton, setLogoutButton] = useState(token ? "Logout" : "Login")

    const toDoLogout = () => {
        localStorage.removeItem("token")
        goToLoginPage(navigate)
    }

    const lookToken = () => {
        if (token) {
            toDoLogout()
            setLogoutButton("Login")
            goToLoginPage(navigate)
        } else {
            goToLoginPage(navigate)
        }
    }

    return (
        <S.DivHeader>
            <S.TextoLogo onClick={() => goToFeedPage(navigate)} >LaBeddit</S.TextoLogo>
            <S.IconeLogo src={Icone_Logo} alt='Icone da logo labEddit' />
            <S.TextoLogo onClick={lookToken} >{logoutButton}</S.TextoLogo>
        </S.DivHeader>
    )
}

export default Header
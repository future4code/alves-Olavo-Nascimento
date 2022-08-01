import axios from "axios";
import { BASE_URL } from '../../assets/url'

export const postLogin = (body, setLoading, goToFeedPage, navigate) => {
    setLoading(true)
    axios.post(`${BASE_URL}/users/login`, body)
        .then(res => {
            setLoading(false)
            localStorage.setItem("token", res.data.token)
            goToFeedPage(navigate)
        })
        .catch(err => {
            setLoading(false)
            alert(err.response.data)
        })
}

export const postSignup = (form, setLoading, goToFeedPage, navigate) => {
    axios.post(`${BASE_URL}/users/signup`, form)
        .then(res => {
            setLoading(false)
            alert("Usuário cadastrado com sucesso!")
            alert("entre com seu email e senha cadastrados.")
            goToFeedPage(navigate)
        })
        .catch(err => {
            setLoading(false)
            alert(err.response.data)
        })
}
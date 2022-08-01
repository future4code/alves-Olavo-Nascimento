import axios from "axios";
import { BASE_URL } from '../../assets/url'
import {header_token} from '../../assets/header_token'

export const createPost = (form, setLoading3) => {
    setLoading3(true)
    axios.post(`${BASE_URL}/posts`, form, header_token)
        .then(res => {setLoading3(false)
            alert(res.data)
        })
        .catch(err => {
            setLoading3(false)
            alert(err.response.data)
        })
}

export const postComment = (params, setLookingLike, setLoading2, form) => {
    setLookingLike(true)
    setLoading2(true)
    axios.post(`${BASE_URL}/posts/${params.id}/comments`, form, header_token)
        .then(res => {
            setLoading2(false)
            setLookingLike(false)
        })
        .catch(err => {
            setLoading2(false)
            alert(err.response.data)
            alert("Ocorreu um erro, tente novamente, se o erro persistir entre em contato.")
        })
}
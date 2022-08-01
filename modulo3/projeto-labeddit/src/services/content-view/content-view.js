import axios from "axios";
import { BASE_URL } from '../../assets/url'
import { header_token } from "../../assets/header_token";

export const getPosts = (setLoading2, setListPost) => {
  setLoading2(true)
  axios.get(`${BASE_URL}/posts`, header_token)
    .then(res => {
      setLoading2(false)
      setListPost(res.data)
      localStorage.setItem("listPost", JSON.stringify(res.data));
    })
    .catch(err => {
      setLoading2(false)
      alert(err.response.data)
      alert("Ocorreu um erro, tente novamente, se o erro persistir entre em contato.")
    })
}

export const getComment = (params, setLoading3, setComments, setNumberComments) => {
  setLoading3(true)
  axios.get(`${BASE_URL}/posts/${params.id}/comments`, header_token)
    .then(res => {
      setLoading3(false)
      setComments(res.data)
      setNumberComments(res.data.length)
    })
    .catch(err => {
      setLoading3(false)
      alert(err.response.data)
      alert("Ocorreu um erro, em carregar os comentários, tente novamente, se o erro persistir entre em contato.")
    })
}
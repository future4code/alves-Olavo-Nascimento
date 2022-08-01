import axios from "axios";
import { BASE_URL } from '../../assets/url'
import { header_token } from "../../assets/header_token";

export const createPostVote = (id, setLiked, liked, deletePostVote, setLookingLike, lookingLike) => {
  if (liked === true) {
    deletePostVote(setLiked, liked, id, setLookingLike, lookingLike)
    setLiked(!liked)
  } else {
    const body = {
      direction: 1
    }
    axios.post(`${BASE_URL}/posts/${id}/votes`, body, header_token)
      .then(res => {
        setLiked(!liked)
        setLookingLike(!lookingLike)
      })
      .catch(err => {
        alert(err.response.data)
        alert("Ocorreu um erro em curtir para cima no post")
      })
  }
}

export const changePostVote = (id, deletePostVote, removeLike, setRemoveLike, setLookingLike, lookingLike) => {
  if (removeLike === true) {
    deletePostVote(setRemoveLike, removeLike, id, setLookingLike, lookingLike)
    setRemoveLike(!removeLike)
  } else {
    const body = {
      direction: -1
    }
    axios.put(`${BASE_URL}/posts/${id}/votes`, body, header_token)
      .then(res => {
        setRemoveLike(!removeLike)
        setLookingLike(!lookingLike)
      })
      .catch(err => {
        alert(err.response.data)
        alert("Ocorreu um erro em para baixo no post.")
      })
  }
}

export const deletePostVote = (setChoice, choice, id, setLookingLike, lookingLike) => {
  axios.delete(`${BASE_URL}/posts/${id}/votes`, header_token)
    .then(res => {
      setChoice(!choice)
      setLookingLike(!lookingLike)
    })
    .catch(err => {
      alert(err.response.data)
      alert("Ocorreu um erro em retirar o seu Voto para cima ou para baixo no post.")
    })
}

export const createCommentVote = (id, setLiked, liked, deleteCommentVote, setLookingLike, lookingLike) => {
  if (liked === true) {
    deleteCommentVote(setLiked, liked, id, setLookingLike, lookingLike)
    setLiked(!liked)
  } else {
    const body = {
      direction: 1
    }
    axios.post(`${BASE_URL}/comments/${id}/votes`, body, header_token)
      .then(res => {
        setLiked(!liked)
        setLookingLike(!lookingLike)
      })
      .catch(err => {
        alert(err.response.data)
        alert("Ocorreu um erro, em curtir para cima nesse comentário.")
      })
  }
}

export const changeCommentVote = (id, deleteCommentVote, removeLike, setRemoveLike, setLookingLike, lookingLike) => {
  if (removeLike === true) {
    deleteCommentVote(setRemoveLike, removeLike, id, setLookingLike, lookingLike)
    setRemoveLike(!removeLike)
  } else {
    const body = {
      direction: -1
    }
    axios.put(`${BASE_URL}/comments/${id}/votes`, body, header_token)
      .then(res => {
        setRemoveLike(!removeLike)
        setLookingLike(!lookingLike)
      })
      .catch(err => {
        alert(err.response.data)
        alert("Ocorreu um erro em curtir para baixo neste comentário.")
      })
  }
}

export const deleteCommentVote = (setChoice, choice, id, setLookingLike, lookingLike) => {
  axios.delete(`${BASE_URL}/comments/${id}/votes`, header_token)
    .then(res => {
      setChoice(!choice)
      setLookingLike(!lookingLike)
    })
    .catch(err => {
      alert(err.response.data)
      alert("Ocorreu um erro em retirar sua curtida para cima ou para baixo neste comentário.")
    
    })
}
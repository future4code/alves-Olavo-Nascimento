import * as S from './style-Post'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Button_Baloon from '../../assets/imagens/baloon.png'
import Button_Up from '../../assets/imagens/up.png'
import Button_Down from '../../assets/imagens/down.png'
import Button_Up_black from '../../assets/imagens/up2.png'
import Button_Down_black from '../../assets/imagens/down2.png'
import Header from "../../componets/header/Header";
import useProtectedPage from "../../hooks/useProtectedPage";
import { postComment } from "../../services/content-creation/content-creation";
import { getComment } from "../../services/content-view/content-view";
import { changeCommentVote, createCommentVote, deleteCommentVote } from "../../services/vote-for-contents/vote-for-contents";

const PostPage = () => {
  useProtectedPage()
  const [loading2, setLoading2] = useState()
  const [loading3, setLoading3] = useState()
  const [comments, setComments] = useState(0)
  const [numberComments, setNumberComments] = useState()
  const params = useParams()
  const listPost = localStorage.getItem("listPost")
  const listPostConvertida = JSON.parse(listPost);
  const { form, onChange, cleanFields } = useForm({ body: "" })
  const [liked, setLiked] = useState(false)
  const [removeLike, setRemoveLike] = useState(false)
  const [lookingLike, setLookingLike] = useState()

  const onSubmit = (event) => {
    event.preventDefault()
    cleanFields()
    postComment(params, setLookingLike, setLoading2, form)
  }

  useEffect(() => {
    getComment(params, setLoading3, setComments, setNumberComments)
  }, [lookingLike])

  const listPostConverted = listPostConvertida.filter((list) => {
    return list.id === params.id
  }).map((list) => {
    return (
      <S.CardPosts key={list.id}>
        <S.CorpoClicavel>
          <S.SentBy>
            <p>Enviado por: {list.username}</p>
            <p>Postado em: {list.createdAt.split('T')[0]}</p>
          </S.SentBy>
          <S.MainCard>
            <p>{list.title}</p>
            <span>{list.body}</span>
          </S.MainCard>
        </S.CorpoClicavel>
        <S.ConteinerIcons>
          <S.IconsUpDownBaloon src={Button_Up} alt='ícone gostei' />
          <p>{list.voteSum === null ? 0 : list.voteSum}</p>
          <S.IconsUpDownBaloon src={Button_Down} alt='ícone não gostei' />
          <S.IconsUpDownBaloon src={Button_Baloon} alt='ícone comentarios' />
          <p>{list.commentCount === null ? 0 : list.commentCount}</p>
        </S.ConteinerIcons>
      </S.CardPosts>
    )
  })

  return (
    <div>
      <Header />
      <S.DivPost>
        {listPostConverted}
        {loading2 ? (<p>Enviando comentário...</p>) :
          <S.FormPost onSubmit={onSubmit} >
            <S.InputPost
              placeholder="Escreva seu comntário..."
              type='text'
              required
              value={form.body}
              name={"body"}
              onChange={onChange}
            />
            <S.Botons>Comentar</S.Botons>
          </S.FormPost>
        }
        <h3>Conmentários</h3>
        {numberComments === 0 ? (<S.MessageNoExist>Ainda não existe nenhum comentário neste post, seja o primeiro a comentar.</S.MessageNoExist>) :
          <div>
            {loading3 ? (<p> Carregando comentários, aguarde...</p>) :
              comments && comments.map((comme) => {
                return (
                  <S.CardCommet key={comme.id}>
                    <S.EnviadoPor>
                      <p>Enviado por: {comme.username}</p>
                      <p>Postado em: {comme.createdAt.split('T')[0]}</p>
                    </S.EnviadoPor>
                    <S.MainCardComment>
                      <p>{comme.body}</p>
                    </S.MainCardComment>
                    <S.IconsUpDownComment>
                      <S.IconsUpDownBaloon src={comme.userVote === 1 ? Button_Up_black : Button_Up} onClick={() => createCommentVote(comme.id, setLiked, liked, deleteCommentVote, setLookingLike, lookingLike)} alt='ícone gostei' />
                      <p>{comme.voteSum === null ? 0 : comme.voteSum}</p>
                      <S.IconsUpDownBaloon src={comme.userVote === -1 ? Button_Down_black : Button_Down} onClick={() => changeCommentVote(comme.id, deleteCommentVote, removeLike, setRemoveLike, setLookingLike, lookingLike)} alt='ícone não gostei' />
                    </S.IconsUpDownComment>
                  </S.CardCommet>
                )
              })
            }
          </div>
        }
      </S.DivPost >
    </div>
  )
}

export default PostPage

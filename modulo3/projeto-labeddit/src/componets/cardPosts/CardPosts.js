import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from './styled-CardPost'
import { goToPostPage } from "../../routes/cordinator";
import Button_Baloon from '../../assets/imagens/baloon.png'
import Button_Up from '../../assets/imagens/up.png'
import Button_Up_black from '../../assets/imagens/up2.png'
import Button_Down from '../../assets/imagens/down.png'
import Button_Down_black from '../../assets/imagens/down2.png'
import { getPosts } from "../../services/content-view/content-view";
import { changePostVote, createPostVote, deletePostVote } from "../../services/vote-for-contents/vote-for-contents";

const CardPosts = (props) => {
  const navigate = useNavigate()
  const [listPost, setListPost] = useState([])
  const [loading2, setLoading2] = useState()
  const [liked, setLiked] = useState(false)
  const [removeLike, setRemoveLike] = useState(false)
  const [lookingLike, setLookingLike] = useState()

  useEffect(() => {
    getPosts(setLoading2, setListPost)
  }, [lookingLike, props.loading3])

  return (
    <div>
      {loading2 ? (<p>Carregando posts, aguarde...</p>) :
        listPost.map((post) => {
          return (
            <S.CardPosts key={post.id} >
              <S.CorpoClicavel onClick={() => goToPostPage(navigate, post.id)}>
                <S.EnviadoPor>
                  <p>Enviado por: {post.username}</p>
                  <p>Postado em: {post.createdAt.split('T')[0]}</p>
                </S.EnviadoPor>
                <S.MainCard>
                  <p>{post.title}</p>
                  <span>{post.body}</span>
                </S.MainCard>
              </S.CorpoClicavel>
              <S.ConteinerIcons>
                <S.IconsUpDownBaloon
                  src={post.userVote === 1 ? Button_Up_black : Button_Up} alt='ícone gostei'
                  onClick={() => createPostVote(post.id, setLiked, liked, deletePostVote, setLookingLike, lookingLike)}
                />
                <p>{post.voteSum === null ? 0 : post.voteSum} </p>
                <S.IconsUpDownBaloon
                  src={post.userVote === -1 ? Button_Down_black : Button_Down} alt='ícone não gostei'
                  onClick={() => changePostVote(post.id, deletePostVote, removeLike, setRemoveLike, setLookingLike, lookingLike)}
                />
                <S.IconsUpDownBaloon
                  src={Button_Baloon} alt='ícone comentarios'
                />
                <p>{post.commentCount === null ? 0 : post.commentCount}</p>
              </S.ConteinerIcons>
            </S.CardPosts>
          )
        })
      }
    </div >
  )
}

export default CardPosts

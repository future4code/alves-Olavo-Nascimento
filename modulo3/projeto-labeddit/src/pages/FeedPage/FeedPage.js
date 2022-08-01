import React, { useState } from "react";
import * as S from './styled-Feed'
import Header from "../../componets/header/Header";
import useForm from "../../hooks/useForm";
import CardPosts from "../../componets/cardPosts/CardPosts";
import useProtectedPage from "../../hooks/useProtectedPage";
import { createPost } from "../../services/content-creation/content-creation";

const FeedPage = () => {
    useProtectedPage()
    const [loading3, setLoading3] = useState()
    const { form, onChange, cleanFields } = useForm({
        title: "",
        body: ""
    })

    const onSubmit = (event) => {
        event.preventDefault()
        cleanFields()
        createPost(form, setLoading3)
    }

    return (
        <div>
            <Header />
            <S.DivFeed>
                {loading3 ? (<p>Aguarde, processando...</p>) :
                    (
                        <S.FormFeed onSubmit={onSubmit} >
                            <S.InputTitulo
                                placeholder="Título"
                                type='text'
                                required
                                value={form.title}
                                name={"title"}
                                onChange={onChange}
                                maxLength={100}
                            />
                            <S.InputPost
                                placeholder="Escreva seu post..."
                                type='text'
                                required
                                value={form.body}
                                name={"body"}
                                onChange={onChange}
                            />
                            <S.Botons>Postar</S.Botons>
                        </S.FormFeed>
                    )
                }
                < CardPosts loading3={loading3}/> 
            </S.DivFeed>
        </div>
    )
}

export default FeedPage


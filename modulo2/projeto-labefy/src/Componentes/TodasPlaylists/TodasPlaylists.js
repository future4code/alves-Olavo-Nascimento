import React from "react";
import axios from "axios";
import styled from "styled-components";

const ListaPlay = styled.div`
display: flex ;
justify-content: space-between;
width: 200px;
margin: 5px;
`

const Div = styled.div`
display: flex ;
align-items: center;
margin: 5px;
flex-direction: column;
`

export default class TodasPlaylists extends React.Component {

    state = {
        adicionaPlay: ""
    }

    apagarPlayList = (id) => {
        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`
        axios.delete(url, {
            headers: { Authorization: "olavo-marques-alves" }
        })
            .then((resposta) => {
                console.log(resposta)
                alert("Usuário deletado com sucesso")
                this.props.pegaPlayLists()
            })
            .catch((erro) => {
                console.log(erro)
                alert("Ocorreu um erro, tente")
            })
    }

    onClickAdicionaPlay = () => {
        const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists"
        const body = {
            name: this.state.adicionaPlay
        }
        axios.post(url, body, {
            headers: { Authorization: "olavo-marques-alves" }
        })
            .then((resposta) => {
                resposta.status === 200 && alert("Playlist adicicona!")
            })
            .catch((erro) => {
                console.log(erro.response.data.message)
                erro.response.data.message === "There already is a playlist with a similiar name." && alert("Jaexiste uma playlist com esse nome.")
                erro.response.data.message === "Name or auth token are missing" && alert("O campo esta vazio :(")

            })

        this.setState({ adicionaPlay: "" })

    }

    onChangeAdicionaPlay = (event) => {
        this.setState({ adicionaPlay: event.target.value })
    }

    render() {
        const playListsAtualizada = this.props.playlists.map((lista) => {
            return (
                <ListaPlay key={lista.id}>
                    <li>{lista.name}</li>
                    <button onClick={() => this.apagarPlayList(lista.id)}>Remover</button>
                </ListaPlay>
            )
        })
        return (
            <Div>
                <button onClick={() => this.props.mudaTela("detalhes")} >Detalhes das Músicas</button>
                <h3>Playlists</h3>
                {playListsAtualizada}
                <input
                    onChange={this.onChangeAdicionaPlay}
                    value={this.state.adicionaPlay}
                    placeholder="Adicionar playlist"
                />
                <button onClick={this.onClickAdicionaPlay} >Adicionar Play List</button>
            </Div>
        )
    }
}
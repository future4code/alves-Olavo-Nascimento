import React from "react";
import axios from "axios";
import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;

`



export default class AddMusica extends React.Component {
    state = {
        musica: "",
        cantor: "",
        linkUrl: "",
        idPlay: "",
        albumDeMusicas:[],
        istaDeMusicas:[],
        idAlbumDeMusicas:[]
    }



    onChangeMusica = (event) => {
        // console.log("entrou musica")
        this.setState({ musica: event.target.value })
    }

    onChangeCantor = (event) => {
        // console.log("entrou cantor")
        this.setState({ cantor: event.target.value })
    }

    onChangeLinkUrl = (event) => {
        // console.log("entrou musica")
        this.setState({ linkUrl: event.target.value })
    }

    onClickAdicionaMusica = (id) => {
        // console.log("entrou em onclic")
        const urll = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`
        const body = {
            name: this.state.nome,
            artist: this.state.musica,
            url: this.state.linkUrl
        }
        axios.post(urll, body, {
            headers: { Authorization: "olavo-marques-alves" }
        })
            .then((resposta) => {
                console.log(resposta)
                // resposta.status === 200 && alert("Playlist adicicona!")
            })
            .catch((erro) => {
                console.log(erro)
                // erro && alert("Ocorreu um erro, tente")


            })

        this.setState({ musica: "", cantor: "", linkUrl: "" })

    }

    render() {

        return (
            <Div>
                <button onClick={() => this.props.irParaTodasPLay} >Todas as Playlists</button>
                <button onClick={() => this.props.irParaAddMusica} >Adicionar Música</button>
                <button onClick={() => this.props.irParaAddPlaylist} >Adicionar PlayLists</button>
                <input
                    onChange={this.onChangeMusica}
                    value={this.state.musica}
                    placeholder="Nome da música"
                />
                <input
                    onChange={this.onChangeCantor}
                    value={this.state.cantor}
                    placeholder="Nome cantor"
                />
                <input
                    type="link"
                    onChange={this.onChangeLinkUrl}
                    value={this.state.linkUrl}
                    placeholder="Endereço url"
                />
                <button onClick={this.onClickAdicionaMusica}>Adicionar Música</button>
            </Div>
        )
    }
}
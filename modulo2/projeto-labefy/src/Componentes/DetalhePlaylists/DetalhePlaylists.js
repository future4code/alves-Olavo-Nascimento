import React from "react";
import axios from "axios";
import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;

`
export default class DetalhePlaylists extends React.Component {
    state = {
        musica: "",
        cantor: "",
        linkUrl: "",
    }

    onChangeMusica = (event) => {
        this.setState({ musica: event.target.value })
    }

    onChangeCantor = (event) => {
        this.setState({ cantor: event.target.value })
    }

    onChangeLinkUrl = (event) => {
        this.setState({ linkUrl: event.target.value })
    }

    componentDidMount() {
        this.props.pegaMusicaPlay()
    }

    onClickAdicionaMusica = (id) => {
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
                this.props.pegaMusicaPlay(id)
                resposta.status === 200 && alert("Playlist adicicona!")
            })
            .catch((erro) => {
                console.log(erro)
                alert("Ocorreu um erro, tente novamente.")
            })
        this.setState({ musica: "", cantor: "", linkUrl: "" })
    }

    render() {
        const listaDeTracks = this.props.listaDeTracks.map((track) => {
            return (
                <div>
                    <p>Musicas:{track.name}</p>
                    <p>Artistas:{track.artist}</p>
                    <p>Link:{track.url}</p>
                </div>
            )
        })
        console.log(listaDeTracks)
        return (
            <Div>
                <button onClick={() => this.props.mudaTela("todasPLay")} >Todas as Playlists</button>
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
                {listaDeTracks}
            </Div>
        )
    }
}
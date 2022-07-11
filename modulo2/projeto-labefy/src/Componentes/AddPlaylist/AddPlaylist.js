import React from "react";
import axios from "axios";


export default class AddPlaylist extends React.Component {

    state = {
        adicionaPlay: ""
    }

    onChangeAdicionaPlay = (event) => {
        // console.log("entrou addplay")
        this.setState({ adicionaPlay: event.target.value })
    }


    onClickAdicionaPlay = () => {
        // console.log("entrou em onclic")
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
                // console.log(erro.response.data.message)
                erro.response.data.message === "There already is a playlist with a similiar name." && alert("Jaexiste uma playlist com esse nome.")
                erro.response.data.message === "Name or auth token are missing" && alert("O campo esta vazio :(")

            })

        this.setState({ adicionaPlay: "" })

    }

    render() {
        return (
            <div>
                <button onClick={this.props.irParaTodasPLay} >Todas as Playlists</button>
                <input
                    onChange={this.onChangeAdicionaPlay}
                    value={this.state.adicionaPlay}
                    placeholder="Adicionar playlist"
                />
                <button onClick={this.onClickAdicionaPlay} >Adicionar Play List</button>
            </div>
        )
    }
}
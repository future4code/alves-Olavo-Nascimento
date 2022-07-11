import React from 'react';
import axios from 'axios';
import TodasPlaylists from './Componentes/TodasPlaylists/TodasPlaylists';
import DetalhePlaylists from './Componentes/DetalhePlaylists/DetalhePlaylists';

export default class App extends React.Component {

  state = {
    telaAtual: "detalhes",
    playlists: [],
    albumDeMusicas: [],
    listaDeTracks: [],
    idAlbumDeMusicas: []
  }

  componentDidMount() {
    this.pegaPlayLists()
  }
  mudaTela = (tela) => {
    this.setState({ telaAtual: tela })
  }

  pegaPlayLists = () => {
    const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists"
    axios.get(url, {
      headers: { Authorization: "olavo-marques-alves" }
    })
      .then((resposta) => {
        console.log(resposta)
        this.setState({ playlists: resposta.data.result.list })
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  pegaMusicaPlay = (id) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`
    axios.get(url, {
      headers: { Authorization: "olavo-marques-alves" }
    }).then((resposta) => {
      console.log(resposta)
      this.setState({istaDeMusicas: resposta.data.result.tracks})
      this.setState({idAlbumDeMusicas: id})
    })
      .catch((erro) => {
        console.log(erro)
      })

  }

  exibirTela = () => {
    switch (this.state.telaAtual) {
      case "todasPLay":
        return (
          <TodasPlaylists
            mudaTela={this.mudaTela}
            playlists={this.state.playlists}
            pegaPlayLists={this.pegaPlayLists}
          />
        )
      case "detalhes":
        return (
          <DetalhePlaylists
            mudaTela={this.mudaTela}
            pegaMusicaPlay={this.pegaMusicaPlay}
            listaDeTracks={this.state.listaDeTracks}
            idAlbumDeMusicas={this.state.idAlbumDeMusicas}
          />
        )
      default:
        return <div>Página não encontrada!</div>
    }
  }

  render() {
    return (
      <div>
        {this.exibirTela()}
      </div >
    )
  }
}



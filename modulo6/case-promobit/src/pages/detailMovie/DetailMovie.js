import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { KEY, URL_BASE, URL_BASE_PHOTO } from "../../constants/Constrants"
import styled from "styled-components"

export const GenresName = styled.div`
margin: 0 5px 0 5px;
color: #FFF;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

export const ContainerInfo = styled.div`
display: flex;
align-items: center;
`
export const ContainerGenres = styled.div`
color: #9B9B9B;
display: flex;
align-items: center;
`
export const ContainerBody = styled.div`
border: 1px solid black;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
height: 100vh; 
/* background-image: ${props => `url('${props.URL_BASE_PHOTO}${props.poster_path}')`}; */
background:
linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);
background-color: #131313;
background-size: 20px 20px;
`

export const ContainerCard = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`
export const AllDetails = styled.div`
width: 30vw;
height: 400px;
margin-left: 20px;
border-left: 1px solid #FFF;
padding-left: 10px;
`
export const PosterFront = styled.img`
width: 300px;
height: 400px;
border-radius: 5px;
margin-left: 10px;
`
export const Iframe = styled.iframe`
width: 60vw;
height: 40vh;
border-radius: 5px;
border: none;
margin-top: 2vh;
`
export const ContainerSinopse = styled.div`
width: 50%;
height: 400px;
border-left: 1px solid #FFF;
`
export const InfoMovie = styled.p`
color: #FFF;
font-size: 15px;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-weight: 800;
`
export const ValeuInfo = styled.p`
color: #9B9B9B;
font-size: 16px;
margin-left: 5px;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`
export const SinopseTitulo = styled.p`
color: #FFF;
margin-left: 10px;
font-size: 23px;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`
export const Sinopse = styled.p`
margin-left: 10px;
color: #9B9B9B;
font-size: 18px;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`
export const ContainerMovie = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 10vh;
border-bottom:1px solid #FFF;
padding-bottom: 10px;
width: 99%
`

const DetailMovie = () => {
    const [detailMovie, setDetailMovie] = useState({})
    const [genres, setGenres] = useState([])
    const [trailer, setTrailer] = useState([])
    // const navigate = useNavigate()
    const params = useParams()

    const getDetailsMovies = () => {
        console.log("entrei getDetailsMovies")

        axios.get(`${URL_BASE}3/movie/${params.id}?api_key=${KEY}c&language=pt-BR`)
            .then((res) => {
                console.log(res)
                setDetailMovie(res.data)
                setGenres(res.data.genres)
                // setCompaniesProduction(res.data.production_companies)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getTrailerMovies = () => {
        console.log("entrei getTrailerMovies")

        axios.get(`${URL_BASE}3/movie/${params.id}/videos?api_key=${KEY}c&language=pt-BR`)
            .then((res) => {
                console.log("getTrailerMovies", res)
                setTrailer(res.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getDetailsMovies()
        getTrailerMovies()
    }, [])

    const data = detailMovie
    console.log("data", data)
    console.log("data.title", data.title)

    const allGenders = genres.map((genre) => {
        return <GenresName>{genre.name}</GenresName>
    })

    const dateLocal = new Date(data.release_date).toLocaleDateString().split("/").join("-")

    const trailerFilter = trailer.map((traile) => {
        const key = traile.key
        return key
    })
    const trailerKey = trailerFilter[0]
    console.log("aqui", trailerKey)

    return (
        <ContainerBody>
            <ContainerCard>
                <Iframe src={`https://www.youtube.com/embed/${trailerKey}`} ></Iframe>

                <ContainerMovie>
                    <PosterFront src={`${URL_BASE_PHOTO}${data.poster_path}`} alt={`Capa filme ${data.title}`} />

                    <AllDetails>
                        <ContainerInfo>
                            <InfoMovie>Titulo</InfoMovie>
                            <ValeuInfo>{data.title}</ValeuInfo>
                        </ContainerInfo>
                        <ContainerInfo>
                            <InfoMovie>Titulo Original</InfoMovie>
                            <ValeuInfo>{data.original_title}</ValeuInfo>
                        </ContainerInfo>
                        <ContainerInfo>
                            <InfoMovie>Data Lançamento</InfoMovie>
                            <ValeuInfo>{dateLocal}</ValeuInfo>
                        </ContainerInfo>
                        <ContainerInfo>
                            <InfoMovie>Slogan</InfoMovie>
                            <ValeuInfo>{data.tagline}</ValeuInfo>
                        </ContainerInfo>
                        <ContainerInfo>
                            <InfoMovie>Orçamento</InfoMovie>
                            <ValeuInfo> {data.budget}</ValeuInfo>
                        </ContainerInfo>
                        <ContainerInfo>
                            <InfoMovie>Arecadou</InfoMovie>
                            <ValeuInfo>{data.revenue}</ValeuInfo>
                        </ContainerInfo>
                        <ContainerInfo>
                            <InfoMovie>Gênero</InfoMovie>
                            <ContainerGenres>{allGenders}</ContainerGenres>
                        </ContainerInfo>
                        <ContainerInfo>
                            <InfoMovie>Idioma Original</InfoMovie>
                            <ValeuInfo>{data.original_language}</ValeuInfo>
                        </ContainerInfo>
                    </AllDetails>

                    <ContainerSinopse>
                        <SinopseTitulo>Sinopse</SinopseTitulo>
                        <Sinopse>{data.overview}</Sinopse>
                    </ContainerSinopse>
                </ContainerMovie>

            </ContainerCard>
        </ContainerBody>
    )
}

export default DetailMovie
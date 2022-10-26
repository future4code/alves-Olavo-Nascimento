import { KEY, URL_BASE, URL_BASE_PHOTO } from "../../constants/Constrants"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { goToDetailPage } from "../../router/Cordinator"
import Header from "../../components/header/Header"

export const Body = styled.div`
display: flex;
flex-direction: column;
height:100%;
width: 100%;
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
export const ContainerHeader = styled.div`
display: flex;
flex-basis: 15%;
`
export const ContainerCard = styled.div`
display: flex;
flex-basis: 70%;
flex-wrap: wrap;
column-gap: 30px;
justify-content:center;
/* border: 2px solid red; */
margin-top: 5vh;
`
export const ContainerPagination = styled.div`
display: flex;
flex-basis: 15%;
/* width: 100%; */
height: 200px;
justify-content: center;
/* border: 2px solid red; */
padding-bottom: 40px;
padding-top: 40px;
`
export const Buttons = styled.button`
display: flex;
/* flex-basis: 5%; */
width: 60px;
height: 50px;
justify-content: center;
/* border: 2px solid red; */
align-items:center;
`
export const CardMovies = styled.div`
/* border: 2px solid red; */
width: 300px;
/* height: 50vh; */
padding: 5px;
display: flex;
flex-direction: column;
align-items:center;
border-radius: 5px;
&:hover {
		cursor: pointer;
    transform: scale(1.1);
    transition: transform .2s;
	}
`
export const PosterPath = styled.img`
/* border: 2px solid violet; */
width: 300px;
height: 300px;
`
export const ImagesPoster = styled.div`
height: 300px; 
display: flex;
justify-content: center;
`
export const Title = styled.p`
color: #FFFFFF;
font-family:'Arial Narrow Bold', sans-serif;
text-align:center;
`

const FeedPage = () => {
   const currentPage = localStorage.getItem("currentPage")
   const [movie, setMovie] = useState([])
   const [page, setPage] = useState(1)
   const navigate = useNavigate()

   const getMovies = () => {
      console.log("entrei getMovies")

      axios.get(`${URL_BASE}3/movie/popular?api_key=${KEY}c&language=pt-BR&page=${page}`)
         .then((res) => {
            console.log(res)
            setMovie(res.data.results)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   useEffect(() => {
      getMovies()
      // if(!currentPage === null) return setPage(1)
      // setPage(currentPage)
   }, [page])

   const nextPage = (page) => {
      console.log("entrei em upadatePage", page)
      setPage(page + 1)
      localStorage.setItem("currentPage", page)
   }
   const previousPage = (page) => {
      console.log("entrei em upadatePage", page)
      
      if(page === 1) return setPage(1)
      
      setPage(page - 1)
      localStorage.setItem("currentPage", page)
   }

   console.log(currentPage)

   return (
      <Body>
         <ContainerHeader>
            <Header />
         </ContainerHeader>
         
         <ContainerCard>
            {
               movie.map((movie) => {
                  return (
                     <CardMovies key={movie.id} onClick={() => goToDetailPage(navigate, movie.id)}>
                        <ImagesPoster>
                           <PosterPath src={`${URL_BASE_PHOTO}${movie.poster_path}`} />
                        </ImagesPoster>

                        <Title>{movie.title}</Title>
                     </CardMovies>
                  )

               })
            }
         </ContainerCard>

         <ContainerPagination>
            <Buttons onClick={() => previousPage(page)}>◀️</Buttons>
            <Buttons>{page}</Buttons>
            <Buttons onClick={() => nextPage(page)}>▶️</Buttons>
         </ContainerPagination>
      </Body>
   )
}

export default FeedPage  
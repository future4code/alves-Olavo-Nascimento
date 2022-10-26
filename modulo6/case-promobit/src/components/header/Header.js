import styled from "styled-components"
import IMG_LOGO from '../../assets/the-movie.png'

export const ContainerBody = styled.div`
background-color: #032541;
width: 100%;
`
export const ImgLogo = styled.img`
`
const Header = () => {
    return (
        <ContainerBody>
            <ImgLogo src={IMG_LOGO} />
        </ContainerBody>
    )
}

export default Header
import styled from "styled-components";

export const DivHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
    background-color: red;
`
export const TextoLogo = styled.h1`
    cursor: pointer;
    margin: 8px;
    color: #45525B;
    &:hover{
        color: #FE7E02;
    }
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
      font-size: 18px;
    }
`
export const IconeLogo = styled.img`
    width: 40px;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
      width: 30px;
    }
`
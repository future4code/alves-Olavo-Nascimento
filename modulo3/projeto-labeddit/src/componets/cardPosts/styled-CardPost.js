import styled from "styled-components";

export const FormPost = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50vh;
    height: 30vh;
    border-bottom: 1px solid;
    margin-bottom: 5vh;
`

export const DivPost = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    margin-top: 10vh;
`

export const CardPosts = styled.div`
    width: 50vh;
    height: 20vh;
    padding: 10px;
    font-family: sans-serif;
    font-size: 18px;
    margin: 10px 20px;
    padding: 0;
    border: solid 2px #FE7E02;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
`

export const EnviadoPor = styled.div`
    color: green;
    display: flex;
    justify-content: space-between;
    flex-basis: 10%;
    font-size: 12px;
    margin-left: 5px;
    width: 98%;
`
export const MainCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 90%;
    width: 45vh;
    max-height: 20vh;
    margin-left: 5px;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
        font-size: 14px;
    }
`
export const ConteinerIcons = styled.section`
    display: flex;
    align-items: center; 
`
export const IconsUpDownBaloon = styled.img`
    width: 20px;
    margin: 0 8px 0 8px;
    &:hover{
        color: red;
    }
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
        width: 15px;
    }
`
export const CorpoClicavel = styled.div`
    display: flex;
    align-items: flex-start;
    width: 46vh;
    height: 100%;
    font-family: sans-serif;
    font-size: 18px;
    cursor: pointer;
    flex-direction: column;
    word-break: break-word;
    margin-left: 5px;
`








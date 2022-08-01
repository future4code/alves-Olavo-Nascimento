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

export const Botons = styled.button`
    width: 50vh;
    height: 5vh;
    font-size: 18px;
`

export const InputPost = styled.textarea`
    width: 50vh;
    height: 15vh;
    display:flex;
    padding-bottom: 50px;
    padding: 10px;
    font-family: sans-serif;
    font-size: 18px;
    border-radius: 12px;
    border: solid 2px #FE7E02;
`

export const LitleIcons = styled.img`
    width: 20px;
    margin: 0 8px 0 8px;
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
    display: flex;
    flex-direction: column;
`
export const CardCommet = styled.div`
    width: 50vh;
    height: 20vh;
    padding: 10px;
    font-family: sans-serif;
    font-size: 18px;
    margin: 10px 20px;
    padding: 0;
    border: solid 2px #FE7E02;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
`

export const SentBy = styled.div`
    color: green;
    display: flex;
    justify-content: space-between;
    flex-basis: 10%;
    width: 96%;
    font-size: 12px;
    margin-left: 5px;
`
export const EnviadoPor = styled.div`
    color: green;
    display: flex;
    justify-content: space-between;
    flex-basis: 10%;
    font-size: 12px;
    width: 96%;
    margin-left: 7px;
`
export const MainCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 90%;
    max-width: 100%;
    margin-left: 5px;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
        font-size: 14px;
    }
`
export const MainCardComment = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 80%;
    width: 98%;
    margin-left: 7px;
    word-break: break-word;
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
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
        width: 15px;
    }
`
export const CorpoClicavel = styled.div`
    display: flex;
    align-items: flex-start;
    width: 48vh;
    height: 100%;
    font-family: sans-serif;
    font-size: 18px;
    flex-direction: column;
    word-break: break-word;
    margin-left: 5px;
`

export const IconsUpDownComment = styled.section`
    display: flex;
    flex-basis: 10%;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    font-size: 18px;
    cursor: pointer;
`
export const MessageNoExist = styled.p`
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
        width: 80vw;
        text-align: center;
    }
`





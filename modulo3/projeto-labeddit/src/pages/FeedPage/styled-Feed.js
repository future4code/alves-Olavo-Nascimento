import styled from "styled-components";

export const FormFeed = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50vh;
    height: 30vh;
    border-bottom: 1px solid;
    margin-bottom: 5vh;
`
export const DivFeed = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    margin-top: 10vh;
`
export const Botons = styled.button`
    width: 50vh;
    height: 10vh;
    font-size: 18px;
`
export const InputTitulo = styled.textarea`
    width: 50vh;
    height: 10vh;
    display:flex;
    align-items: flex-start;
    padding-bottom: 50px;
    padding: 10px;
    font-family: sans-serif;
    font-size: 18px;
    border-radius: 12px;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
      font-size: 14px;
    }
`
export const InputPost = styled.textarea`
    width: 50vh;
    height: 35vh;
    display:flex;
    padding-bottom: 50px;
    padding: 10px;
    font-family: sans-serif;
    font-size: 18px;
    border-radius: 12px;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
      font-size: 14px;
    }
`
export const CardPosts = styled.div`
    width: 50vh;
    height: 20vh;
    padding: 10px;
    font-family: sans-serif;
    font-size: 18px;
    margin: 10px 20px;
    border: solid 2px #FE7E02;
    border-radius: 12px;
    cursor: pointer;
`
export const EnviadoPor = styled.h6`
    color: green;
    display: flex;
    justify-content: space-between;
`

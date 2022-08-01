import styled from "styled-components";

export const FormRegistration = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40vh;
    height: 35vh;
    border-bottom: 1px solid;

`
export const DivLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    margin-top: 25vh;
    @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
        height: 50vh;
    }
    `
export const Botons = styled.button`
    width: 40vh;
    `
export const ConteinerAgree = styled.section`
    display: flex;
    flex-direction: row;
`
export const InputAgree = styled.input`
   width: 20px;
   height: 20px;
`
export const TextHello = styled.h2`
     @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
         font-size: 16px;
         margin-bottom: 10px;
    }
`
export const TextContract = styled.p`
   margin: 15px 15px;
   @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
        font-size: 12px;
        margin: 5px 5px;
    }
`
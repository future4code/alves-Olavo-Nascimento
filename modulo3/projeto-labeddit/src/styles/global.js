import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  button {
    cursor: pointer;
    background-color: #FE7E02;
    border: none;
    border-radius: 5px;
    color: white;
    width: 100px;
    height: 40px;
    margin: 8px;
    
  }

  input {
    width: 40vh;
    height: 30px;
    border-radius: 5px;
    margin: 5px;
  }
  
  button:hover{
    background-color: red;
  }
` 
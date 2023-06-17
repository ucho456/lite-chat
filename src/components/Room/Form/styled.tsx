import styled from "styled-components";
import { CONTAINER_MAX_WIDTH, PRIMARY, WHITE } from "@/utils/style/variables";

export const FormStyled = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${PRIMARY};
  padding-top: 10px;
  form {
    width: 94%;
    max-width: ${CONTAINER_MAX_WIDTH};
    margin: 0 auto;
    background-color: ${WHITE};
    border-radius: 5px;
    position: relative;
    display: flex;
    textarea {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      resize: none;
      padding: 10px 50px 10px 7px;
      overflow: hidden;
      background: transparent;
      border: none;
      outline: none;
      font-size: large;
    }
    .button-column {
      margin: 0 0 0 auto;
    }
  }
`;

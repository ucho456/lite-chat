import styled from "styled-components";
import { colors, containerMaxWidth } from "@/utils/style/variables";

export const formHeight = "70px";

export const FormStyled = styled.div`
  height: ${formHeight};
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${colors.primary};
  padding-top: 10px;
  form {
    width: 94%;
    max-width: ${containerMaxWidth};
    margin: 0 auto;
    background-color: ${colors.white};
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

import styled from "styled-components";
import { FONT_COLOR_GRAY, FONT_COLOR_RED } from "@/utils/style/variables";

export const ContainerStyled = styled.div`
  min-width: 310px;
  display: grid;
  grid-template-rows: 50px 50px 50px 120px;
  gap: 20px;
  text-align: center;
  h3 {
    grid-row: 1 / 2;
    padding-top: 20px;
    height: 30px;
    line-height: 30px;
  }
  .sex-row {
    grid-row: 2 / 3;
  }
  .era-row {
    grid-row: 3 / 4;
  }
  .button-row {
    grid-row: 4 / 5;
    .limit-reached {
      width: 200px;
      margin: 5px auto 0;
      text-align: left;
      color: ${FONT_COLOR_RED};
      font-size: 10px;
    }
    p {
      margin: 5px 0;
      color: ${FONT_COLOR_GRAY};
      font-size: 12px;
    }
  }
`;

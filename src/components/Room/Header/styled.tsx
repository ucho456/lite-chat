import styled from "styled-components";
import {
  containerMaxWidth,
  colors,
  headerHeight,
} from "@/utils/style/variables";

export const HeaderStyled = styled.div`
  height: ${headerHeight};
  background-color: ${colors.ghostWhite};
  .container {
    display: grid;
    grid-template-columns: 50px 210px auto 50px 50px;
    grid-template-rows: 50px;
    max-width: ${containerMaxWidth};
    height: 100%;
    margin: 0 auto;
    .leave-column {
      grid-column: 1 / 2;
    }
    .photo-column {
      grid-column: 2 / 3;
      padding: 5px 0 0 5px;
    }
    .phone-column {
      grid-column: 4 / 5;
    }
    .block-column {
      grid-column: 5 / 6;
    }
  }
`;

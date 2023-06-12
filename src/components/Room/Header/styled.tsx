import styled from "styled-components";
import { CONTAINER_MAX_WIDTH, GHOST_WHITE, HEADER_HEIGHT } from "@/utils/style/variables";

export const HeaderStyled = styled.div`
  height: ${HEADER_HEIGHT};
  background-color: ${GHOST_WHITE};
  .container {
    display: grid;
    grid-template-columns: 50px 210px auto 50px 50px;
    grid-template-rows: 50px;
    max-width: ${CONTAINER_MAX_WIDTH};
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
`
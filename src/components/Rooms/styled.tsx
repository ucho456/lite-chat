import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import {
  CONTAINER_MAX_WIDTH,
  FONT_COLOR_LINK,
  FONT_COLOR_RED,
  GHOST_WHITE,
} from "@/utils/style/variables";

export const RoomsStyled = styled.div`
  background-color: ${GHOST_WHITE};
  .spacer {
    height: 10px;
  }
  .list {
    min-height: calc(100vh - 60px);
    max-width: ${CONTAINER_MAX_WIDTH};
    width: 100%;
    margin: 0 auto;
    p {
      text-align: center;
      color: ${FONT_COLOR_RED};
      font-size: 12px;
      span {
        span {
          color: ${FONT_COLOR_LINK};
          ${hover};
        }
      }
    }
  }
`;

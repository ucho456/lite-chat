import styled from "styled-components";
import { FONT_COLOR_WHITE } from "@/utils/style/variables";

export const AppSnackbarStyled = styled.div`
  .MuiSnackbar-root {
    .MuiPaper-root {
      .MuiAlert-icon {
        .MuiSvgIcon-root {
          path {
            color: ${FONT_COLOR_WHITE} !important;
          }
        }
      }
      .MuiAlert-message {
        color: ${FONT_COLOR_WHITE} !important;
      }
    }
  }
`;

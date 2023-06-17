import styled from "styled-components";
import { fontColors } from "@/utils/style/variables";

export const AppSnackbarStyled = styled.div`
  .MuiSnackbar-root {
    .MuiPaper-root {
      .MuiAlert-icon {
        .MuiSvgIcon-root {
          path {
            color: ${fontColors.white} !important;
          }
        }
      }
      .MuiAlert-message {
        color: ${fontColors.white} !important;
      }
    }
  }
`;

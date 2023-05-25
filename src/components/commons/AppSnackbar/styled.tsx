import styled from "styled-components";

export const AppSnackbarStyled = styled.div`
  .MuiSnackbar-root {
    .MuiPaper-root {
      .MuiAlert-icon {
        .MuiSvgIcon-root {
          path {
            color: white !important;
          }
        }
      }
      .MuiAlert-message {
        color: white !important;
      }
    }
  }
`;

import styled from "styled-components";

export const ProfileFormStyled = styled.div`
  .container {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 180px 140px;
    text-align: center;
    .me-row {
      grid-row: 1 / 2;
      padding-top: 20px;
      h3 {
        height: 30px;
        line-height: 30px;
      }
      .container {
        display: grid;
        gap: 0;
        grid-template-columns: 1fr 1.5fr;
        grid-template-rows: repeat(2, 1fr);
        .photo-column {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
          .photo {
            margin: 20px auto;
            &:hover {
              cursor: pointer;
              opacity: 0.6;
            }
          }
          input {
            display: none;
          }
        }
        .name-column {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          padding-top: 30px;
          padding-right: 10px;
        }
        .select-column {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
          padding-top: 10px;
          text-align: left;
          display: flex;
        }
        .spacer {
          width: 7px;
        }
      }
    }
    .self-introduction-row {
      margin: 0 auto;
      width: 93%;
      grid-row: 2 / 3;
    }
  }
`;

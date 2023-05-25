import styled from "styled-components";
import { hover, pc, sp, tab, wideSp, wideTab } from "@/utils/style/mixins";
import {
  containerMaxWidth,
  ghostWhite,
  headerHeight,
  white,
} from "@/utils/style/variables";

export const TopStyled = styled.div`
  min-height: 100vh;
  header {
    height: ${headerHeight};
    width: 100%;
    background-color: ${ghostWhite};
    .container {
      display: grid;
      grid-template-columns: 200px auto 100px;
      grid-template-rows: ${headerHeight};
      max-width: ${containerMaxWidth};
      height: 100%;
      margin: 0 auto;
      img {
        grid-column: 1 / 2;
        width: 150px;
        height: 50px;
      }
      div {
        grid-column: 3 / 4;
        align-self: center;
        text-decoration: none;
        ${hover}
      }
    }
  }
  .hero {
    margin: 0 auto;
    height: calc(100vh - ${headerHeight});
    background-color: ${ghostWhite};
    .container {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      max-width: ${containerMaxWidth};
      margin: 0 auto;
      height: 100%;
      .left {
        height: 100%;
        .text {
          margin-top: 50%;
          text-align: center;
          h2 {
            .desktop {
              font-weight: 700;
              display: inline-block;
            }
            .mobile {
              font-weight: 700;
              display: none;
            }
          }
          p {
            margin-top: 10px;
          }
        }
        .buttons {
          margin: 30px auto 0;
          width: 330px;
          display: flex;
          .sign-in-button {
            margin-left: 30px;
            width: 100%;
          }
        }
      }
      .right {
        height: 100%;
        position: relative;
        img {
          height: 750px;
          width: 368px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(5deg);
        }
      }
    }
    ${pc(`
      .container {
        .left {
          .text {
            margin-top: 25%;
          }
        }
        .right {
          img {
            height: 431px;
            width: 211px;
          }
        }
      }`)}
    ${wideTab(`
      .container {
        .left {
          .text {
            margin-top: 35%;
          }
        }
      }`)}
    ${tab(`
      height: calc(70vh - ${headerHeight});
      .container {
        .left {
          .text {
            margin-top: 45%;
            h2 {
              font-size: 20px;
            }
            p {
              font-size: 12px;
            }
          }
        }
      }
    `)}
    ${wideSp(`
      height: calc(100vh - ${headerHeight});
      .container {
        .left {
          .text {
            margin-top: 20%;
          }
        }
        .right {
          img {
            height: 260px;
            width: 128px;
          }
        }
      }
    `)}
    ${sp(`
      height: calc(65vh - ${headerHeight});
        .container {
          grid-template-columns: 200px 170px;
          .left {
            .text {
              margin-top: 50px;
              h2 {
                .desktop {
                  display: none;
                }
                .mobile {
                  display: inline-block;
                }
              }
            }
            .buttons {
              flex-direction: column;
              justify-content: center;
              align-items: stretch;
              margin: 10px auto 0 0;
              button {
                width: 150px;
                margin: 0 0 20px 30px;
              }
              .sign-in-button {
                width: 150px;
              }
            }
          }
        }
    `)}
  }
  .features {
    margin: 50px 0;
    h2 {
      font-weight: 700;
      text-align: center;
      margin-bottom: 50px;
    }
    .container {
      display: grid;
      grid-template-columns: 300px 300px 300px;
      grid-template-rows: 450px;
      gap: 50px;
      justify-content: center;
      max-width: ${containerMaxWidth};
      margin: 0 auto;
      .feature {
        img {
          height: 300px;
          width: 300px;
        }
        h3 {
          font-weight: 700;
          text-align: center;
          margin-bottom: 5px;
        }
      }
    }
    ${wideTab(`
      .container {
        grid-template-columns: 200px 200px 200px;
        .feature {
          width: 200px;
          img {
            height: 200px;
            width: 200px;
          }
        }
      }
    `)}
    ${tab(`
      .container {
        grid-template-columns: 300px;
        grid-template-rows: 450px 450px 450px;
        .feature {
          width: 300px;
          img {
            height: 300px;
            width: 300px;
          }
        }
      }
    `)}
  }
  .q-a {
    padding-bottom: 100px;
    background-color: ${ghostWhite};
    h2 {
      font-weight: 700;
      padding-top: 50px;
      text-align: center;
      margin-bottom: 50px;
    }
    .container {
      max-width: ${containerMaxWidth};
      margin: 0 auto;
    }
  }
  .lets-try {
    margin: 50px 0 100px;
    h2 {
      font-weight: 700;
      text-align: center;
    }
    .buttons {
      margin: 30px auto 0;
      width: 330px;
      display: flex;
      .sign-in-button {
        margin-left: 30px;
        width: 100%;
      }
      ${sp(`
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        margin: 30px auto 0 0;
        button {
          width: 80%;
          margin: 0 0 20px 30px;
        }
        .sign-in-button {
          width: 80%;
        }
      `)}
    }
  }
  footer {
    background-color: #2a2a2a;
    padding: 40px 0;
    .container {
      max-width: 960px;
      margin: 0 auto;
    }
    .footer-links {
      list-style: none;
      text-align: center;
      li {
        display: inline-block;
        margin-right: 20px;
        a {
          color: ${white};
          text-decoration: none;
          ${hover};
        }
      }
    }
    .copy-right {
      color: ${white};
      font-size: 14px;
      padding-top: 20px;
      text-align: center;
    }
  }
`;

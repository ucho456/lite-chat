import { ErrorStyled } from "@/components/Error/styled";

const Error = () => {
  return (
    <ErrorStyled>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </ErrorStyled>
  );
};

export default Error;

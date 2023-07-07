import { render } from "@testing-library/react";
import Error from "@/components/Error";

describe("Error component", () => {
  it("renders the correct content", () => {
    const { getByText } = render(<Error />);
    expect(getByText("Oops!")).toBeInTheDocument();
    expect(
      getByText("Sorry, an unexpected error has occurred."),
    ).toBeInTheDocument();
  });
});

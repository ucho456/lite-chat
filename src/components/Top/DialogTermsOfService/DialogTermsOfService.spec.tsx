import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DialogTermsOfService from "./index";

describe("DialogTermsOfService", () => {
  test("renders the component with default props", () => {
    render(<DialogTermsOfService />);
  });
  test("renders the component with custom text and textStyle", () => {
    const customText = "Custom Terms";
    const customTextStyle = {
      fontSize: "14px",
      color: "red",
    };
    render(
      <DialogTermsOfService text={customText} textStyle={customTextStyle} />,
    );
  });
  test("opens the dialog when the text is clicked and closes it when the close button is clicked", async () => {
    render(<DialogTermsOfService />);
    const textElement = screen.getByText("利用規約に同意する");

    userEvent.click(textElement);

    await waitFor(() => {
      const dialogElement = screen.getByRole("dialog");
      expect(dialogElement).toBeInTheDocument();

      const closeButton = within(dialogElement).getByRole("button", {
        name: "閉じる",
      });

      userEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

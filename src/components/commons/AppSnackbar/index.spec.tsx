import { render, screen } from "@testing-library/react";
import AppSnackbar from "@/components/commons/AppSnackbar";

describe("AppSnackbar", () => {
  test("renders message when open is true", async () => {
    const message = "This is a test message";
    render(<AppSnackbar open={true} message={message} />);
    const messageElement = await screen.findByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  test("does not render when open is false", async () => {
    const message = "This is a test message";
    render(<AppSnackbar open={false} message={message} />);
    const messageElement = screen.queryByText(message);
    expect(messageElement).not.toBeInTheDocument();
  });

  test("renders with the correct severity", async () => {
    const message = "This is a test message";
    render(<AppSnackbar open={true} message={message} severity="error" />);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveClass("MuiAlert-filledError");
  });
});

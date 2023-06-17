import { AlertColor } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarContext, useSnackbar } from "@/contexts/Snackbar";

describe("SnackbarContextProvider", () => {
  test("provides correct context values", async () => {
    const message = "Test message";
    const severity: AlertColor = "success";
    const openSnackbarMock = jest.fn();

    render(
      <SnackbarContext.Provider
        value={{ message, severity, openSnackbar: openSnackbarMock }}
      >
        <TestComponent />
      </SnackbarContext.Provider>,
    );

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(severity)).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Open Snackbar" });
    await userEvent.click(button);
    expect(openSnackbarMock).toHaveBeenCalledWith("New message", "error");
  });
});

const TestComponent = () => {
  const { message, severity, openSnackbar } = useSnackbar();
  return (
    <div>
      <span>{message}</span>
      <span>{severity}</span>
      <button onClick={() => openSnackbar("New message", "error")}>
        Open Snackbar
      </button>
    </div>
  );
};

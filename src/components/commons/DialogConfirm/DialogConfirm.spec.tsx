import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DialogConfirm from "@/components/commons/DialogConfirm";

describe("DialogConfirm", () => {
  const onClickAgree = vi.fn();
  const onClickReject = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  test("renders with the correct message", () => {
    const message = "Are you sure?";
    render(
      <DialogConfirm
        open={true}
        onClickAgree={onClickAgree}
        onClickReject={onClickReject}
        message={message}
      />,
    );
    const dialogContentText = screen.getByText(message);
    expect(dialogContentText).toBeInTheDocument();
  });

  test('calls onClickAgree when "はい" button is clicked', async () => {
    render(
      <DialogConfirm
        open={true}
        onClickAgree={onClickAgree}
        onClickReject={onClickReject}
        message="Are you sure?"
      />,
    );
    const agreeButton = screen.getByText("はい");
    await userEvent.click(agreeButton);
    expect(onClickAgree).toHaveBeenCalledTimes(1);
  });

  test('calls onClickReject when "いいえ" button is clicked', async () => {
    render(
      <DialogConfirm
        open={true}
        onClickAgree={onClickAgree}
        onClickReject={onClickReject}
        message="Are you sure?"
      />,
    );
    const rejectButton = screen.getByText("いいえ");
    await userEvent.click(rejectButton);
    expect(onClickReject).toHaveBeenCalledTimes(1);
  });
});

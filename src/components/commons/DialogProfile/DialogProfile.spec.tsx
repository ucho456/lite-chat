import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DialogProfile from "@/components/commons/DialogProfile";

describe("DialogProfile", () => {
  const roomUser: RoomUser = {
    uid: "uid",
    name: "John Doe",
    photo: null,
    sex: "man",
    era: "early 30's",
    selfIntroduction: "Hello, I am John Doe.",
    unread: false,
  };

  test("renders user name", () => {
    render(<DialogProfile you={roomUser} />);
    const nameElement = screen.getByText(roomUser.name);
    expect(nameElement).toBeInTheDocument();
  });

  test("opens dialog when clicked", async () => {
    render(<DialogProfile you={roomUser} />);
    const nameElement = screen.getByText(roomUser.name);
    userEvent.click(nameElement);
    await waitFor(() => {
      const dialogElement = screen.getByRole("dialog");
      expect(dialogElement).toBeInTheDocument();
    });
  });

  test("renders user information in dialog", async () => {
    render(<DialogProfile you={roomUser} />);
    const nameElement = screen.getByText(roomUser.name);
    userEvent.click(nameElement);
    await waitFor(() => {
      const nameElement = screen.getAllByText(roomUser.name)[1];
      const sexAndEraElement = screen.getByText(`男性 30代前半`);
      const introductionElement = screen.getByText(roomUser.selfIntroduction);
      expect(nameElement).toBeInTheDocument();
      expect(sexAndEraElement).toBeInTheDocument();
      expect(introductionElement).toBeInTheDocument();
    });
  });
});

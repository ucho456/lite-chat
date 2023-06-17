import { render, screen } from "@testing-library/react";
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
  beforeEach(() => {
    render(<DialogProfile you={roomUser} />);
  });
  test("renders user name", () => {
    const nameElement = screen.getByText(roomUser.name);
    expect(nameElement).toBeInTheDocument();
  });
  test("opens dialog when clicked", async () => {
    const nameElement = screen.getByText(roomUser.name);
    await userEvent.click(nameElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });
  test("renders user information in dialog", async () => {
    const nameElement = screen.getByText(roomUser.name);
    await userEvent.click(nameElement);
    const nameElement2 = screen.getAllByText(roomUser.name)[1];
    const sexAndEraElement = screen.getByText(`男性 30代前半`);
    const introductionElement = screen.getByText(roomUser.selfIntroduction);
    expect(nameElement2).toBeInTheDocument();
    expect(sexAndEraElement).toBeInTheDocument();
    expect(introductionElement).toBeInTheDocument();
  });
});

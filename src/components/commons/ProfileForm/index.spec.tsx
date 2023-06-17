import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileForm from "@/components/commons/ProfileForm";

describe("ProfileForm", () => {
  const inputUser: InputUser = {
    name: "",
    photo: null,
    sex: "man",
    era: "over 18",
    selfIntroduction: "",
  };
  const mockSetInputUser = jest.fn();
  beforeEach(() => {
    render(
      <ProfileForm inputUser={inputUser} setInputUser={mockSetInputUser} />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  /*test("updates photo when file is selected", async () => {
    const file = new File(["(photo content)"], "photo.jpg", {
      type: "image/jpeg",
    });
    const photoInput = screen.getByTestId("photo");
    Object.defineProperty(photoInput, "files", {
      value: [file],
    });
    await userEvent.upload(photoInput, file);
    expect(mockSetInputUser.mock.calls[0][0].photo).toBe(file);
  }); */
  test("updates name when input value is changed", async () => {
    const nameInput = screen.getAllByRole("textbox")[0];
    const newName = "A";
    await userEvent.type(nameInput, newName);
    expect(mockSetInputUser.mock.calls[0][0].name).toBe(newName);
  });
  test("updates sex when select value is changed", async () => {
    const sexSelect = screen.getByLabelText("性別");
    await userEvent.click(sexSelect);
    const womanOption = screen.getByText("女性");
    await userEvent.click(womanOption);
    expect(mockSetInputUser.mock.calls[0][0].sex).toBe("woman");
  });
  test("updates era when select value is changed", async () => {
    const eraSelect = screen.getByLabelText("年代");
    await userEvent.click(eraSelect);
    const early30sOption = screen.getByText("30代前半");
    await userEvent.click(early30sOption);
    expect(mockSetInputUser.mock.calls[0][0].era).toBe("early 30's");
  });
  test("updates selfIntroduction when input value is changed", async () => {
    const selfIntroInput = screen.getByLabelText("自己紹介");
    const newIntro = "A";
    await userEvent.type(selfIntroInput, newIntro);
    expect(mockSetInputUser.mock.calls[0][0].selfIntroduction).toBe(newIntro);
  });
});

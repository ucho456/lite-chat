import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ERAS } from "@/utils/constants";
import "./ProfileForm.scss";

type Props = {
  inputUser: InputUser;
  setInputUser: React.Dispatch<React.SetStateAction<InputUser>>;
};

const ProfileForm = ({ inputUser, setInputUser }: Props) => {
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxWidth = 200;
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        const photo = canvas.toDataURL("image/jpeg");
        setInputUser({ ...inputUser, photo });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="profile-form">
      <div className="container">
        <div className="me-row">
          <h3>- あなたのプロフィール -</h3>
          <div className="container">
            <div className="photo-column">
              <label htmlFor="photo-input">
                <Avatar
                  className="photo"
                  src={inputUser.photo ?? "/images/avatar.webp"}
                  sx={{ width: 110, height: 110 }}
                />
              </label>
              <input
                data-testid="photo"
                id="photo-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="name-column">
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ maxLength: 10 }}
                label="ニックネーム"
                required
                size="small"
                type="text"
                value={inputUser.name}
                onChange={(e) =>
                  setInputUser({ ...inputUser, name: e.target.value })
                }
              />
            </div>
            <div className="select-column">
              <FormControl>
                <InputLabel id="sex-label">性別</InputLabel>
                <Select
                  fullWidth
                  label="性別"
                  labelId="sex-label"
                  size="small"
                  sx={{ width: "70px", fontSize: "10px" }}
                  value={inputUser.sex}
                  onChange={(e) =>
                    setInputUser({ ...inputUser, sex: e.target.value as Sex })
                  }
                >
                  <MenuItem value={"man"}>男性</MenuItem>
                  <MenuItem value={"woman"}>女性</MenuItem>
                </Select>
              </FormControl>
              <div className="spacer" />
              <FormControl>
                <InputLabel id="era-label">年代</InputLabel>
                <Select
                  fullWidth
                  label="年代"
                  labelId="era-label"
                  size="small"
                  sx={{ width: "100px", fontSize: "10px" }}
                  value={inputUser.era}
                  onChange={(e) =>
                    setInputUser({ ...inputUser, era: e.target.value as Era })
                  }
                >
                  {ERAS.map((e) => (
                    <MenuItem key={e.value} value={e.value}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="self-introduction-row">
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 140 }}
            label="自己紹介"
            type="text"
            multiline
            rows={4}
            value={inputUser.selfIntroduction}
            onChange={(e) =>
              setInputUser({ ...inputUser, selfIntroduction: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

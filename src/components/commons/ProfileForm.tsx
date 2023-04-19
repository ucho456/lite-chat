import {
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { ERAS } from "@/utils/constants";
import "./ProfileForm.scss";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<InputUser, any>;
  handleSubmit: UseFormHandleSubmit<InputUser>;
  handleFunction: SubmitHandler<InputUser>;
  children: JSX.Element;
};

const ProfileForm = ({
  control,
  handleSubmit,
  handleFunction,
  children,
}: Props) => {
  return (
    <div className="profile-form">
      <Stack component="form" onSubmit={handleSubmit(handleFunction)}>
        <div className="container">
          <div className="me-row">
            <h3>- あなたのプロフィール -</h3>
            <div className="container">
              <div className="photo-column">
                <Avatar
                  className="photo"
                  src="/avatar.png"
                  sx={{ width: 110, height: 110 }}
                />
              </div>
              <div className="name-column">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ maxLength: 10 }}
                      label="ニックネーム"
                      required
                      size="small"
                      type="text"
                    />
                  )}
                />
              </div>
              <div className="select-column">
                <Controller
                  control={control}
                  name="sex"
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="sex-label">性別</InputLabel>
                      <Select
                        {...field}
                        fullWidth
                        label="性別"
                        labelId="sex-label"
                        size="small"
                        sx={{ width: "70px" }}
                      >
                        <MenuItem value={"man"}>男性</MenuItem>
                        <MenuItem value={"woman"}>女性</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <div className="spacer" />
                <Controller
                  control={control}
                  name="era"
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="era-label">年代</InputLabel>
                      <Select
                        {...field}
                        fullWidth
                        label="年代"
                        labelId="era-label"
                        size="small"
                        sx={{ width: "100px" }}
                      >
                        {ERAS.map((e) => (
                          <MenuItem key={e.value} value={e.value}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="button-row">{children}</div>
        </div>
      </Stack>
    </div>
  );
};

export default ProfileForm;

import "./ProfileForm.scss";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { InputUser } from "../../hooks/useUser";

type Props = {
  control: Control<InputUser, any>;
  handleSubmit: UseFormHandleSubmit<InputUser>;
  handleFunction: SubmitHandler<InputUser>;
  children: any;
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
              <div className="sex-column">
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
                      >
                        <MenuItem value={"man"}>男性</MenuItem>
                        <MenuItem value={"woman"}>女性</MenuItem>
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

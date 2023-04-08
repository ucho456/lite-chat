import {
  Avatar,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import "./TopDialog.scss";
import { Send } from "@mui/icons-material";
import useUser, { InputUser } from "../../hooks/useUser";

const TopDialog = () => {
  const navigate = useNavigate();
  const { setUserDoc } = useUser();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit } = useForm<InputUser>({
    shouldUnregister: false,
    defaultValues: { name: "test", photo: null, sex: "man" },
  });

  const [loading, setLoading] = useState(false);
  const handleSignup: SubmitHandler<InputUser> = async (
    inputUser: InputUser
  ) => {
    try {
      setLoading(true);
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      await setUserDoc(userCredential.user.uid, inputUser);
      navigate("/rooms");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button fullWidth size="large" variant="contained" onClick={handleOpen}>
        新規登録
      </Button>
      <Dialog className="top-dialog" open={open} onClose={handleClose}>
        <Stack component="form" onSubmit={handleSubmit(handleSignup)}>
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
                        <InputLabel id="me-sex-label">性別</InputLabel>
                        <Select
                          {...field}
                          fullWidth
                          label="性別"
                          labelId="me-sex-label"
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
            <div className="button-row">
              <LoadingButton
                loading={loading}
                endIcon={<Send />}
                loadingPosition="end"
                size="large"
                type="submit"
                variant="contained"
              >
                {loading ? "マッチング中..." : "マッチングを開始"}
              </LoadingButton>
            </div>
          </div>
        </Stack>
      </Dialog>
    </div>
  );
};

export default TopDialog;

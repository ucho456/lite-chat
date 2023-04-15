import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";
import "./UserSearchDialog.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import useUser, { Sex } from "../../hooks/useUser";
import { useSnackbar } from "../../contexts/Snackbar";
import { useAppSelector } from "../../store/hooks";
import useRoom from "../../hooks/useRoom";

type InputCondition = {
  sex: Sex;
};

const UserSearchDialog = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit } = useForm<InputCondition>({
    shouldUnregister: false,
    defaultValues: { sex: "man" },
  });

  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const { searchUserDocs } = useUser();
  const { addRoomDoc } = useRoom();
  const me = useAppSelector((state) => state.user.user);
  const handleMatching: SubmitHandler<InputCondition> = async (
    inputCondition: InputCondition
  ) => {
    if (!me) return;
    const { sex } = inputCondition;
    try {
      setLoading(true);
      const users = await searchUserDocs(sex);
      const you = users.find((u) => u.uid !== me.uid);
      if (you) {
        await addRoomDoc(
          { uid: me.uid, name: me.name, photo: me.photo },
          { uid: you.uid, name: you.name, photo: you.photo }
        );
        openSnackbar(`${you.name}さんとマッチしました。`, "success");
      } else {
        openSnackbar("相手が見つかりませんでした。", "error");
      }
    } catch {
      openSnackbar("マッチに失敗しました。", "error");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="user-search-dialog">
      <Button className="button" onClick={handleOpen}>
        新規マッチング
      </Button>
      <Dialog className="user-search-dialog" open={open} onClose={handleClose}>
        <Stack component="form" onSubmit={handleSubmit(handleMatching)}>
          <div className="container">
            <h3>- あいての条件 -</h3>
            <div className="sex-row">
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
            <div className="button-row">
              <LoadingButton
                loading={loading}
                size="large"
                type="submit"
                variant="contained"
              >
                マッチング開始
              </LoadingButton>
            </div>
          </div>
        </Stack>
      </Dialog>
    </div>
  );
};

export default UserSearchDialog;

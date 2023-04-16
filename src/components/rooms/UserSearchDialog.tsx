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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useRoom, { Room } from "../../hooks/useRoom";
import { setUserAsync } from "../../store/modules/userSlice";

type Props = {
  rooms: Room[];
};

type InputCondition = {
  sex: Sex;
};

const UserSearchDialog = ({ rooms }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit } = useForm<InputCondition>({
    shouldUnregister: false,
    defaultValues: { sex: "man" },
  });

  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const { getRandomUserDocs } = useUser();
  const { addRoomDoc } = useRoom();
  const me = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const handleMatching: SubmitHandler<InputCondition> = async (
    inputCondition: InputCondition
  ) => {
    if (!me) return;
    const { sex } = inputCondition;
    try {
      setLoading(true);
      const users = await getRandomUserDocs({ sex });
      const alreadyMatchUserIds = rooms.map((r) =>
        r.inviteeUser.uid !== me.uid ? r.inviteeUser.uid : r.invitedUser.uid
      );
      alreadyMatchUserIds.push(me.uid);
      const you = users.find((u) => !alreadyMatchUserIds.includes(u.uid));
      if (you) {
        await addRoomDoc(
          { uid: me.uid, name: me.name, photo: me.photo, unread: false },
          { uid: you.uid, name: you.name, photo: you.photo, unread: false }
        );
        dispatch(setUserAsync({ user: { ...me, life: me.life - 1 } }));
        openSnackbar(`${you.name}さんとマッチしました。`, "success");
      } else {
        openSnackbar("条件に合う相手が見つかりませんでした。", "error");
      }
    } catch {
      openSnackbar("マッチに失敗しました。", "error");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!me) return <></>;
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
                disabled={me.life === 0}
                loading={loading}
                size="large"
                type="submit"
                variant="contained"
              >
                マッチング開始
              </LoadingButton>
              <p>本日の残り{me.life}回</p>
            </div>
          </div>
        </Stack>
      </Dialog>
    </div>
  );
};

export default UserSearchDialog;

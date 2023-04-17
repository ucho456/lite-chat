import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useSnackbar } from "@/contexts/Snackbar";
import useUser from "@/hooks/useUser";
import { useAppSelector } from "@/store/hooks";
import { ERAS } from "@/utils/constants";
import { createRoom } from "@/utils/writeToFirestore";
import "./UserSearchDialog.scss";

type Props = {
  rooms: Room[];
};

type InputCondition = {
  sex: Sex;
  era: Era;
};

const UserSearchDialog = ({ rooms }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit } = useForm<InputCondition>({
    shouldUnregister: false,
    defaultValues: { sex: "man", era: "early 20's" },
  });

  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const { getRandomUserDocs } = useUser();
  const me = useAppSelector((state) => state.user.user);
  const handleMatching: SubmitHandler<InputCondition> = async (
    inputCondition: InputCondition,
  ) => {
    if (!me) return;
    const { sex, era } = inputCondition;
    try {
      setLoading(true);
      const users = await getRandomUserDocs({ sex, era });
      const alreadyMatchUserIds = rooms.map((r) =>
        r.inviteeUser.uid !== me.uid ? r.inviteeUser.uid : r.invitedUser.uid,
      );
      alreadyMatchUserIds.push(me.uid);
      const you = users.find((u) => !alreadyMatchUserIds.includes(u.uid));
      if (you) {
        await createRoom(me, you);
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
                      sx={{ width: "120px" }}
                    >
                      <MenuItem value={"man"}>男性</MenuItem>
                      <MenuItem value={"woman"}>女性</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </div>
            <div className="era-row">
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
                      sx={{ width: "120px" }}
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

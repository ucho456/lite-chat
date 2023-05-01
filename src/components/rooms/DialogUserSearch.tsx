import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSnackbar } from "@/contexts/Snackbar";
import useUser from "@/hooks/useUser";
import { useAppSelector } from "@/store/hooks";
import { ERAS, MATCH_LIMIT } from "@/utils/constants";
import { createRoom, regainLife } from "@/utils/firestore";
import "./DialogUserSearch.scss";

type Props = {
  rooms: Room[];
};

type InputCondition = {
  sex: Sex;
  era: Era;
};

const UserSearchDialog = ({ rooms }: Props) => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** Search form */
  const me = useAppSelector((state) => state.user.user);
  const [inputCondition, setInputCondition] = useState<InputCondition>({
    sex: "man",
    era: "early 20's",
  });
  useEffect(() => {
    if (!me) return;
    setInputCondition({ sex: me.sex === "man" ? "woman" : "man", era: me.era });
  }, [me]);

  /** Matching */
  const [loading, setLoading] = useState(false);
  const { getRandomUserDocs } = useUser();
  const { openSnackbar } = useSnackbar();
  const handleMatching = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!me) return;
    const { sex, era } = inputCondition;
    try {
      setLoading(true);
      const users = await getRandomUserDocs({ sex, era });
      const alreadyMatchUserIds = rooms.map((r) =>
        r.inviteeUser.uid !== me.uid ? r.inviteeUser.uid : r.invitedUser.uid,
      );
      alreadyMatchUserIds.push(me.uid);
      const you = users.find(
        (u) =>
          !alreadyMatchUserIds.includes(u.uid) && !me.blocks.includes(u.uid),
      );
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

  const handleRegainLife = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!me) return;
    try {
      setLoading(true);
      await regainLife(me);
      openSnackbar("マッチング回数を回復しました。", "success");
    } catch {
      openSnackbar("マッチング回数の回復に失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  };

  const [isMatchLimit, setIsMatchLimit] = useState(false);
  useEffect(() => {
    setIsMatchLimit(rooms.length >= MATCH_LIMIT);
  }, [rooms.length]);

  const [isLife, setIsLife] = useState(true);
  useEffect(() => {
    if (!me) return;
    setIsLife(me.life !== 0);
  }, [me]);

  if (!me) return <></>;
  return (
    <div className="dialog-user-search">
      <Button className="button" onClick={handleOpen}>
        マッチング相手を探す
      </Button>
      <Dialog className="dialog-user-search" open={open} onClose={handleClose}>
        <div className="container">
          <h3>- 相手の条件 -</h3>
          <div className="sex-row">
            <FormControl>
              <InputLabel id="sex-label">性別</InputLabel>
              <Select
                fullWidth
                label="性別"
                labelId="sex-label"
                size="small"
                sx={{ width: "120px" }}
                value={inputCondition.sex}
                onChange={(e) =>
                  setInputCondition({
                    ...inputCondition,
                    sex: e.target.value as Sex,
                  })
                }
              >
                <MenuItem value={"man"}>男性</MenuItem>
                <MenuItem value={"woman"}>女性</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="era-row">
            <FormControl>
              <InputLabel id="era-label">年代</InputLabel>
              <Select
                fullWidth
                label="年代"
                labelId="era-label"
                size="small"
                sx={{ width: "120px" }}
                value={inputCondition.era}
                onChange={(e) =>
                  setInputCondition({
                    ...inputCondition,
                    era: e.target.value as Era,
                  })
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
          <div className="button-row">
            <LoadingButton
              disabled={isMatchLimit}
              loading={loading}
              size="large"
              type={isLife ? "submit" : "button"}
              variant="contained"
              onClick={isLife ? handleMatching : handleRegainLife}
            >
              {isLife ? "マッチング開始" : "マッチング回数を回復する"}
            </LoadingButton>
            {isMatchLimit ? (
              <div className="limit-reached">
                マッチング数の上限に達しました。
                別のユーザーとマッチしたい場合、既存のユーザーをブロックして枠を空けて下さい。
              </div>
            ) : (
              <p>マッチング回数残り {me.life} 回</p>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserSearchDialog;

import { memo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TextStyled } from "@/components/Top/DialogTermsOfService/styled";

type Props = {
  text?: string;
  textStyle?: {
    fontSize: string;
    color: string;
  };
};

const DialogTermsOfService = memo(
  ({
    text = "利用規約に同意する",
    textStyle = { fontSize: "12px", color: "#0099ff" },
  }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const terms = [
      "本サービスは、Webブラウザ上でチャットやビデオ電話を通じて、他のユーザーとコミュニケーションを取ることができるサービスです。",
      "本サービスを利用するには、18歳以上であることが必要です。未成年者の方は、本サービスの利用を禁止します。",
      "ユーザーは、本サービスを利用することで発生する一切の責任を負うものとします。",
      "ユーザーは、本サービスを利用するにあたり、法令や公序良俗に反する行為を行ってはならず、他のユーザーに対して迷惑行為を行ってはならないものとします。",
      "本サービスは、予告なく変更や中断、停止することがあります。また、本サービスが原因でユーザーに損害が生じた場合でも、管理者は一切の責任を負いません。",
      "ユーザーは、本サービスの利用にあたり、自己の責任において適切なセキュリティ対策を講じるものとします。管理者は、ユーザーの不注意または不正利用により生じた損害について一切の責任を負いません。",
      "本規約に関する紛争については、日本国法を準拠法とし、東京地方裁判所を第一審の専属的管轄裁判所とします。",
    ];
    return (
      <>
        <TextStyled style={textStyle} onClick={handleOpen}>
          {text}
        </TextStyled>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>利用規約</DialogTitle>
          <DialogContent>
            {terms.map((t, i) => (
              <div key={t}>
                <DialogContentText>
                  {i + 1}. {t}
                </DialogContentText>
                <br />
              </div>
            ))}
            <br />
            <DialogContentText>
              以上が、本サービスの利用規約となります。ユーザーは、本規約に同意したうえで、本サービスを利用してください。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
);

DialogTermsOfService.displayName = "DialogTermsOfService";

export default DialogTermsOfService;

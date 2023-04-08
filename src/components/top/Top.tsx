import TopDialog from "./TopDialog";

const Top = () => {
  return (
    <div className="top">
      <div className="container">
        <div className="logo-row">
          <img src="/logo.png" />
        </div>
        <div className="discription-row">
          <p>
            登録・インストール不要。チャットや通話を気軽に楽しめるサービスです。さぁ始めましょう！
          </p>
        </div>
        <TopDialog />
      </div>
    </div>
  );
};

export default Top;

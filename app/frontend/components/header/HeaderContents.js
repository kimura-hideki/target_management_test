import React from "react";
import Button from "@material-ui/core/Button";

import { useSelector } from "react-redux";
import { clearAll } from "../stores/user";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";


const HeaderContents = () => {
  const name = useSelector(state => state.user.name);
  console.log("state");
  console.log(name);
  const history = useHistory();
  const dispatch2 = useDispatch();
  if( name == "name" ){
    dispatch2(clearAll());
    history.push('/');
  }
  
  const logout = async () => {
    // 保存したユーザー情報を削除してログイン画面に遷移
    dispatch2(clearAll());
    history.push('/');
  }
  return (
    <main>
      <h1>目標管理ネタ</h1>
      {name != "name" && <h2>{name} 様</h2>}
      {name != "name" && 
      <Button
        size="small"
        type="button" 
        variant="contained" 
        color="secondary"
        onClick={() => logout()}
        >
          ログアウト
        </Button>}
    </main>
  )
}
// React.memo(小技系)
// 例えば親コンポーネントが頻繁に更新される場合に使用する
// 今回は使用していないがpropsの属性が等価値であれば再レンダリングがされない
// 今回はこのコンポーネントで宣言しているstate値の変化がなければ再レンダリングされない。
// export default Form;
export default React.memo(HeaderContents);

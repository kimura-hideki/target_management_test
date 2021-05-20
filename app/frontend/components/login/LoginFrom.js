import React, { useRef, useReducer, useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from "react-redux";
import { setUserID, setPassword, setName } from "../stores/user";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "center",
    width: "30%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    textAlign: "center",
    margin: "auto",
  }
});

// initialize
const initialState  = {
  errors: {
    userID: "",
    password: "",
    invalid: ""
  },
  loading: false,
  fatal: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'ERROR':
      return {
        ...state,
        errors: {
          userID: action.error_message.userId,
          password: action.error_message.password,
          invalid: action.error_message.invalid
        },
        loading: false
      };
    default:
      return state; 
  }
};

// ここでは入力フォームをちょっと作ります。
// useStateは使わずにuseRefとuseReducerを使ってみます。
const LoginForm = () => {
  const classes = useStyles();
  const [value1, setValue1] = useState("userID");
  const [value2, setValue2] = useState("password");

  const idChange = (e) => {
    if( e.target.value == "" ){
      setValue1("userID");
    }else{
      setValue1(e.target.value);
    }
  };

  const passwordChange = (e) => {
    if( e.target.value == "" ){
      setValue2("password");
    }else{
      setValue2(e.target.value);
    }
  };
  const dispatch2 = useDispatch();

  // refで設定したDOMノードの参照を作成出来る
  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const hoge = async () => {
    const url = '/api/login';
    // ローディング状態にする
    dispatch({ type: 'LOADING' });
    // この時点での入力値のログ
    // console.log(loginIdRef.current.value);
    // console.log(passwordRef.current.value);
    dispatch2(setUserID(loginIdRef.current.value));
    dispatch2(setPassword(passwordRef.current.value));

    await axios.post(url, {
      userId: loginIdRef.current.value,
      password: passwordRef.current.value,
    }).then(
      (response) => {
        // console.log(response);
        dispatch2(setName(response.data.result[0].user_name));
        // menu画面に遷移
        history.push('/menu');
      }
    ).catch(
      (error) => {
        console.log("error");
        console.log(error);
        dispatch({ type: 'ERROR', error_message: error.response.data});
        console.log(error.response.status);
        console.log(error.response.data)
      }
    );
  }

  useEffect (() => {
    console.log("ID");
  },[value1]);

  useEffect (() => {
    console.log("password");
  },[value2]);

  // console.log(state);
  // 各インプットコンポーネントはmmaterial-uiを使用
  return (

    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        <h1>ログイン{state.fatal === false ? "" : "OK"}</h1>
        </Typography>
      </CardContent>
      <form>
        <TextField 
          required
          inputRef={loginIdRef}
          label="ログインID"
          onChange={idChange}
          message={initialState.errors.userID}
          helperText={state.errors.userID}
          error={state.errors.userID == "" || state.errors.userID == undefined ? false : true}
        />
        <br/>
        <TextField
          required
          label="パスワード"
          type="password"
          autoComplete="current-password"
          onChange={passwordChange}
          inputRef={passwordRef}
          message={initialState.errors.password}
          helperText={state.errors.password}
          error={state.errors.password == "" || state.errors.password == undefined ? false : true}
        />
        <br/>
        <br/>
        <CardActions>
          <Button
          size="small"
          type="button" 
          variant="contained" 
          color="secondary"
          className={classes.button}
          onClick={() => hoge()}
          >
            Login
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

// React.memo(小技系)
// 例えば親コンポーネントが頻繁に更新される場合に使用する
// 今回は使用していないがpropsの属性が等価値であれば再レンダリングがされない
// 今回はこのコンポーネントで宣言しているstate値の変化がなければ再レンダリングされない。
// export default Form;
export default React.memo(LoginForm);

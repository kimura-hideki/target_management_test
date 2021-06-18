import React, {useRef, useEffect, useReducer, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import ItemList from "./itemList"
import { setPrice, setName } from "../stores/item";

const initialState  = {
  items: [],
  loading: false,
  fatal: false,
  item_name: "",
  price: "",
};

const reducer = (state, action) => {
  switch (action.type){
    case 'GET_ITEM_ALL':
      return {...state,
        items: action.payload,
        fatal: false,
      }
    default:
      return state;
  }
}

const useStyles = makeStyles({
    textField: {
        margin: "10px",
        width: "200px"
    },
    rightArea: {
        float: "right",
        width: "300px",
    },
    button: {
        width: "100%",
        margin: "10px",
    },
    listForm: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    listItem: {
        border: "black 1px solid",
    },
    listContents: {
        width: "45%",
        float: "left",
        height: "100%",
    },
    listButton: {
        width: "10%",
    }
});

const ItemSearchForm = () => {
  const [itemState, dispatch] = useReducer(reducer, initialState)
  const classes = useStyles();

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const itemNameRef = useRef(null);
  const priceRef = useRef(null);

  const history = useHistory();
  const new_render = () => {
    // 新規登録画面に遷移
    history.push('/items/new');
  }

  const nameChange = (e) => {
    if( e.target.value == "" ){
      setValue1("");
    }else{
      setValue1(e.target.value);
    }
  };

  const priceChange = (e) => {
    if( e.target.value == "" ){
      setValue2("");
    }else{
      setValue2(e.target.value);
    }
  };
  const dispatch2 = useDispatch();
  const userID = useSelector(state => state.user.userID);

  const getItemList = async () => {
    const url = '/api/items/all';
    
    // データを取得
    await axios.get(url,{
      params:{
        userId: userID,
      }
    }).then(
      (response) => {
        dispatch ({ type: 'GET_ITEM_ALL', payload: response.data.result})
      }
    ).catch(
      (error) => {
        console.log(error.response.status)
        console.log(error.response.data)
      }
    );
  }
  
  const item_search = async () => {
    const url = '/api/items/search';
    dispatch({ type: 'LOADING' });

    await axios.get(url, {
      params:{
        item_name: value1,
        price: value2,
      }
    }).then(
      (response) => {
        // console.log(response);
        dispatch ({ type: 'GET_ITEM_ALL', payload: response.data.result})
        // menu画面に遷移
        // history.push('/menu');
      }
    ).catch(
      (error) => {
        dispatch ({ type: 'GET_ITEM_ALL', payload: []})
      }
    );
  }
  // ランディング時にデータ取得
  useEffect(() => {
    console.log("getItemList");
    getItemList();
  }, [])

  useEffect (() => {
    console.log("item_name");
  },[value1]);

  useEffect (() => {
    console.log("price");
  },[value2]);

  // console.log(state);
  // 各インプットコンポーネントはmmaterial-uiを使用
  return (
    <div>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
      </CardContent>
      <form>
      <TextField
          id="standard-multiline-flexible"
          label="商品名"
          multiline
          rowsMax={4}
          className={classes.textField}
          onChange={nameChange}
        />
        <TextField
          id="standard-multiline-flexible"
          label="金額"
          multiline
          rowsMax={4}
          className={classes.textField}
          onChange={priceChange}
        />
        <CardActions className={classes.rightArea}>
            <div>
          <Button
          size="large"
          type="button" 
          variant="contained" 
          color="secondary"
          className={classes.button}
          onClick={() => new_render()}
          >
            新規登録
          </Button>
          </div>
          <div>
          <Button
          size="large"
          type="button" 
          variant="contained" 
          color="secondary"
          className={classes.button}
          onClick={() => item_search()}
          >
            検索
          </Button>
          </div>
        </CardActions>
      </form>
    </Card>
    <ItemList items={itemState.items}/>
    </div>
  );
}

// React.memo(小技系)
// 例えば親コンポーネントが頻繁に更新される場合に使用する
// 今回は使用していないがpropsの属性が等価値であれば再レンダリングがされない
// 今回はこのコンポーネントで宣言しているstate値の変化がなければ再レンダリングされない。
// export default Form;
export default React.memo(ItemSearchForm);

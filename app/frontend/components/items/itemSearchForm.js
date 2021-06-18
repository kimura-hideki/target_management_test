import React, {useEffect, useReducer } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router";
import axios from "axios";

import { useSelector } from "react-redux";
import ItemList from "./itemList"

const initialState  = {
  items: [],
  loading: false,
  fatal: false,
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

  const history = useHistory();
  const new_render = () => {
    // 新規登録画面に遷移
    history.push('/items/new');
  }

  const userID = useSelector(state => state.user.userID);
  console.log("itemSearchForm")
  console.log(userID)

  const getItemList = async () => {
    const url = '/api/items/all';
    
    // データを取得
    await axios.get(url,{
      params:{
        userId: userID,
      }
    }).then(
      (response) => {
        console.log("----------");
        console.log(response.data.result);
        dispatch ({ type: 'GET_ITEM_ALL', payload: response.data.result})
      }
    ).catch(
      (error) => {
        console.log(error.response.status)
        console.log(error.response.data)
      }
    );
  }
  
  // ランディング時にデータ取得
  useEffect(() => {
    console.log("getItemList");
    getItemList();
  }, [])

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
        />
        <TextField
          id="standard-multiline-flexible"
          label="金額"
          multiline
          rowsMax={4}
          className={classes.textField}
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

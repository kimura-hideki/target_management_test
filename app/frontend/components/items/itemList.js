import React, {useEffect, useReducer } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router";

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

const ItemList = (props) => {
  const classes = useStyles();
  const itemsList = props.items;
  console.log("itemList.js");
  console.log(itemsList);

  const history = useHistory();
  const edit_render = (val) => {
    // 更新画面に遷移
    history.push('/items/' + val.item_id);
  }
  
  // console.log(state);
  // 各インプットコンポーネントはmmaterial-uiを使用
  return (
    <div>
    <List component="nav" aria-label="secondary mailbox folders" className={classes.listForm}>
        {itemsList.map((value) => (
            <div className={classes.listItem}>
                <ListItemText primary={value.item_name} className={classes.listContents} />
                <ListItemText primary={value.price} className={classes.listContents} />
                <ListItem button className={classes.listContents,classes.listButton}>
                    <Button
                    size="large"
                    type="button" 
                    variant="contained" 
                    color="secondary"
                    onClick={() => edit_render(value)}
                    >
                        更新
                    </Button>
                </ListItem>
            </div>
        ))}
    </List>
    </div>
  );
}

// React.memo(小技系)
// 例えば親コンポーネントが頻繁に更新される場合に使用する
// 今回は使用していないがpropsの属性が等価値であれば再レンダリングがされない
// 今回はこのコンポーネントで宣言しているstate値の変化がなければ再レンダリングされない。
// export default Form;
export default React.memo(ItemList);

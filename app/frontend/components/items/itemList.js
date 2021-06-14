import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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

const itemsList = [
    {
      "id":1,
      "title":"ほげほげ",
      "price":1111,
      "image":"a.png"
    },
    {
      "id":2,
      "title":"はげはげ",
      "price":2222,
      "image":"b.png"
    },
    {
      "id":3,
      "title":"ふげふげ",
      "price":3333,
      "image":"c.png"
    },
    {
      "id":4,
      "title":"ふがふが",
      "price":4444,
      "image":"d.png"
    },
    {
      "id":5,
      "title":"まるまる",
      "price":5555,
      "image":"e.png"
    },
  ];

  // ここでは入力フォームをちょっと作ります。
// useStateは使わずにuseRefとuseReducerを使ってみます。
const ItemList = () => {
  const classes = useStyles();

  const history = useHistory();
  const new_render = () => {
    // 新規登録画面に遷移
    history.push('/items/new');
  }

  const edit_render = (val) => {
    // 更新画面に遷移
    history.push('/items/' + val.id);
  }

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
    <List component="nav" aria-label="secondary mailbox folders" className={classes.listForm}>
        {itemsList.map((value) => (
            <div className={classes.listItem}>
                <ListItemText primary={value.title} className={classes.listContents} />
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

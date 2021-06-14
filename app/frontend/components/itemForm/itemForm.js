import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "center",
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "10px",
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
  textField: {
      marginRight: "20px",
      width: "35%",
  },
  cardActions: {
      width: "100%",
  },
  button: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "50px",
  },
  image: {
    float: "left",
    marginLeft: "160px",
  }
});

// ここでは入力フォームをちょっと作ります。
// useStateは使わずにuseRefとuseReducerを使ってみます。
const LoginForm = () => {
  const classes = useStyles();

  // 各インプットコンポーネントはmmaterial-uiを使用
  return (

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
        /><br/>
        <img className={classes.image} width="400" height="400" src="/dist/images/noImageIcon.png" />
        <CardActions className={classes.cardActions}>
            <Button
            size="large"
            type="button" 
            variant="contained" 
            color="secondary"
            className={classes.button}
            >
                更新
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

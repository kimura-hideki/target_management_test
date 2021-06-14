import React from "react";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "center",
    width: "30%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  button: {
    textAlign: "center",
    margin: "auto",
    width: "90%",
  }
});

const MenuForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const salesGo = () => {
    history.push('/sales');
  };
  const itemsGo = () => {
    history.push('/items');
  };
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          <h1>メニュー</h1>
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container wrap="nowrap" spacing={2} direction="column">
            <Grid item xs={12}>
              <Button
              size="large"
              type="button" 
              variant="contained" 
              color="secondary"
              className={classes.button}
              onClick={() => itemsGo()}
              >
                アイテム一覧
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
              size="large"
              type="button" 
              variant="contained" 
              color="secondary"
              className={classes.button}
              onClick={() => salesGo()}
              >
                販売画面
              </Button>
            </Grid>
          </Grid>
        </CardActions>
    </Card>
    )
}
// React.memo(小技系)
// 例えば親コンポーネントが頻繁に更新される場合に使用する
// 今回は使用していないがpropsの属性が等価値であれば再レンダリングがされない
// 今回はこのコンポーネントで宣言しているstate値の変化がなければ再レンダリングされない。
// export default Form;
export default React.memo(MenuForm);

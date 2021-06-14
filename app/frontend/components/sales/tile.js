import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  paper: {
    margin: 'auto',
    maxWidth: 500,
    backgroundColor: "gray",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  item: {
    border: "1px solid black",
    margin: "10px",
    width: "300px",
    height: "290px",
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

  const Tile = () => {
    const classes = useStyles();

    return (
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center">
          {itemsList.map((value) => (
            <Grid key={value} className={classes.item} item>
              <Grid item>
                <Typography gutterBottom variant="subtitle1">
                  {value.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                {value.price}円
                </Typography>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                </ButtonBase>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
  </Grid>
  );
  }

  export default Tile;
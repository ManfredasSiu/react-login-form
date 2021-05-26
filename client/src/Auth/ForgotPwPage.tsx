import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {SayHello} from './APICalls';
import { ResetPwCall } from './APICalls';
import PhotoCodes, {ShufflePhotos} from '../General/Types';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { setUserSession } from '../Utils/Common';
import {GridList, GridListTile} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 800,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

export const Forgot = (props: any) => {


  const classes = useStyles();
  
  const[username, setusername] = useState("");
  const[password, setpassword] = useState("");
  const[isButtonDisabled, setisButtonDisabled] = useState(false);
  const[isError, setisError] = useState(false);
  const[errorCode, setErrorCode] = useState("");

const resetPasswordEvent = async (name : string) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(username)) {
      setErrorCode("Iveskite teisinga el. pasta");
      setisError(true);
      return;
    }

    ResetPwCall(name, "reset");
    setisError(true);
    setErrorCode("Laiškas išsiųstas");
}

    return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Pamirsau slaptazodi" />
        <CardContent>
          <div>
            {isError && <Alert severity="error">{errorCode}</Alert>}
          </div>
          <div>
            <TextField
              error={isError}
              fullWidth
              id="username"
              type="email"
              label="El. Pastas"
              placeholder="El. Pastas"
              margin="normal"
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={() => {
              
              resetPasswordEvent(username);
            }}
            disabled={isButtonDisabled}>
            Siųsti laišką
          </Button>
        </CardActions>
      </Card>
    </form>
    )
  }

  export default Forgot;

import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {SayHello} from './APICalls';
import { CreateUser } from './APICalls';
import PhotoCodes, {ShuffleCodes} from '../General/Types';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { stringify } from 'node:querystring';
import { setUserSession } from '../Utils/Common';
import { Snackbar } from '@material-ui/core';
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

export const Register = (props: any) => {

  const classes = useStyles();

  const[username, setusername] = useState("");
  const[password, setpassword] = useState("");
  const[confirmPassword, setconfirmPassword] = useState("");
  const[helperText, sethelperText] = useState("");
  const[picList, setpicList] = useState(new Array(20).fill(0));
  const[isButtonDisabled, setisButtonDisabled] = useState(false);
  const[isError, setisError] = useState(false);
  const[errorCode, setErrorCode] = useState("");

  const [refs] = useState({
    first: React.createRef(),
  });

const tryLogin = async (name : string, password : string) => {
    if(confirmPassword != password)
    {
      setisError(true);
      setErrorCode("Slaptazodziai nesutampa.")
      return;
    }
    const retCode = await CreateUser(name, password);
    console.log(retCode);
    if(retCode !== false)
    {
      setisError(false);
      props.history.push('/login');
    }
    else
    { 
      setErrorCode("Vartotojas jau egzistuoja, prisijunkite.")
      setisError(true);
    }
}

const onPhotoSelect = (key :string) => {
  setpassword(password+"*"+key);
}

const onPhotoConfirmSelect = (key : string) =>{
  setconfirmPassword(confirmPassword+"*"+key);
}


    return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Registracija" />
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
          <div>
            <TextField
              error={isError}
              fullWidth
              id="password"
              type="email"
              value = {password}
              label="Slaptazodis"
              placeholder="Slaptazodis"
              margin="normal"
              helperText={helperText}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <div>
          <GridList cellHeight={160} cols={5}>
              {PhotoCodes.map((x) => (
              <GridListTile>
                <img src={x.value} alt="photos" onClick={() => onPhotoSelect(x.key)} />
              </GridListTile>
            ))}
          </GridList>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={() => {
              setpassword("");
            }}
            disabled={isButtonDisabled}>
            Isvalyti pasirinkimus
          </Button>
          </div>
          <div>
            <TextField
              error={isError}
              fullWidth
              id="password"
              type="email"
              value = {confirmPassword}
              label="Pakartotas slaptazodis"
              placeholder="Slaptazodis"
              margin="normal"
              helperText={helperText}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <div>
          <GridList cellHeight={160} cols={5}>
              {PhotoCodes.map((x) => (
              <GridListTile>
                <img src={x.value} alt="photos" onClick={() => onPhotoConfirmSelect(x.key)} />
              </GridListTile>
            ))}
          </GridList>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={() => {
              setconfirmPassword("");
            }}
            disabled={isButtonDisabled}>
            Isvalyti pasirinkimus
          </Button>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={() => {
              
              tryLogin(username, password);
            }}
            disabled={isButtonDisabled}>
            Uzsiregistruoti
          </Button>
        </CardActions>
      </Card>
    </form>
    )
    
  }

  export default Register;

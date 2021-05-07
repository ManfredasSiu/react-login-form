import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LoginCall } from './APICalls';
import PhotoCodes, {ShufflePhotos} from '../General/Types';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { setUserSession } from '../Utils/Common';
import {GridList, GridListTile} from '@material-ui/core';
import PublicRoute from '../Utils/PublicRoute';
import forgotPage from './ForgotPwPage';

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

export const Login = (props: any) => {


  const classes = useStyles();

  const[username, setusername] = useState("");
  const[passSymbols, setPassSymbols] = useState("");
  const[password, setpassword] = useState("");
  const[helperText, sethelperText] = useState("");
  const[isButtonDisabled, setisButtonDisabled] = useState(false);
  const[isError, setisError] = useState(false);
  const[errorCode, setErrorCode] = useState("");
  const[tutorialText, setTurorialText] = useState(false);


const tryLogin = async (name : string, password : string) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(username)) {
      setErrorCode("Iveskite teisinga el. pasta");
      setisError(true);
      return;
    }

    const retCode = await LoginCall(name, password);
    
    console.log(retCode);
    if(retCode !== false)
    {
      setisError(false);
      setUserSession(retCode.token, retCode.name);
      props.history.push('/dashboard');
    }
    else{
      setErrorCode("prisijungti nepavyko, vartotojas neegzistuoja arba blogi prisijungimo duomenys"); 
      setisError(true);
    }
}

const onPhotoSelect = (key :string) => {
  if(passSymbols.length>0)
  {
    setpassword(password+"*"+key);
  }
  else setpassword(key);
  setPassSymbols(passSymbols+".");
  ShufflePhotos();
}

    return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Prisijungimas" />
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
            <TextField
              disabled = {true}
              error={isError}
              fullWidth
              id="password"
              type="password"
              value = {passSymbols}
              label="Slaptazodis"
              placeholder="Slaptazodis"
              margin="normal"
              helperText={helperText}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <img src={process.env.PUBLIC_URL+ "questionmark.png"} width="25" height="25" onClick= {() => {setTurorialText(!tutorialText)}} />
            {tutorialText && <p style = {{outline: '5px dotted green'}}>
              <h2>Pagalba</h2>
              Norėdami prisijungti - įveskite registracijos metu įvestą slaptažodį ir spauskite
              mygtuką "Prisijungti".
            </p>}
          </div>
          <div>
          <GridList cellHeight={window.innerHeight*0.15} cols={5}>
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
              setPassSymbols("");
            }}
            disabled={isButtonDisabled}>
            Isvalyti slaptazodi
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
            Prisijungti
          </Button>
        </CardActions>
      </Card>
      <div className="header">
            <NavLink activeClassName="active" to="/forgot">Pamirsau slaptazodi</NavLink><small>(Access without token only)</small>
          </div>
          <div className="content">
            <Switch>
              <PublicRoute path="/forgot" component = {forgotPage}/>
            </Switch>
      </div>
    </form>
    )
  }

  export default Login;

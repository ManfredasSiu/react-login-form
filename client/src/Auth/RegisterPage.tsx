import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { register } from './APICalls';
import PhotoCodes from '../General/Types';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import {GridList, GridListTile} from '@material-ui/core';
import { HostListener } from "@angular/core";


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



  window.addEventListener("resize", function() {
    console.log("Test");
    return window.innerHeight;
  });

  const[username, setusername] = useState("");
  const[password, setpassword] = useState("");
  const[passSymbols, setPassSymbols] = useState("");
  const[confirmPassword, setconfirmPassword] = useState("");
  const[passConfirmSymbols, setPassConfirmSymbols] = useState("");
  const[helperText, sethelperText] = useState("");
  const[picList, setpicList] = useState(new Array(20).fill(0));
  const[isButtonDisabled, setisButtonDisabled] = useState(false);
  const[isError, setisError] = useState(false);
  const[errorCode, setErrorCode] = useState("");
  const[tutorialText, setTurorialText] = useState(false);

  const [refs] = useState({
    first: React.createRef(),
  });

const registerEvent = async (name : string, password : string) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(username)) {
      setErrorCode("Iveskite teisinga el. pasta");
      setisError(true);
      return;
    }
    if(confirmPassword != password)
    {
      setisError(true);
      setErrorCode("Slaptazodziai nesutampa.")
      return;
    }
    const retCode = await register(name, password);
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
  if(passSymbols.length > 0)
  {
    setpassword(password+"*"+key);
  }
  else setpassword(key);
  setPassSymbols(passSymbols+".")
}

const onPhotoConfirmSelect = (key : string) =>{
  if(passConfirmSymbols.length > 0)
  {
    setconfirmPassword(confirmPassword+"*"+key);
  }
  else setconfirmPassword(key);
  setPassConfirmSymbols(passConfirmSymbols+".")
}


    return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Registracija" />
        <CardContent >
          <div>
            {isError && <Alert severity="error">{errorCode}</Alert>}
          </div>
          <div>
            <TextField
              error={isError}
              fullWidth
              id="username"
              type="Email"
              label="El. Pastas"
              placeholder="El. Pastas"
              margin="normal"
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
          </div>
          <div >
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
            />
            <img src={process.env.PUBLIC_URL+ "questionmark.png"} width="25" height="25" onClick= {() => {setTurorialText(!tutorialText)}} />
            {tutorialText && <p style = {{outline: '5px dotted green'}}>
              <h2>Pagalba</h2>
              Norėdami užsiregistruoti - pasirinkite norimą nuotraukų seką ir ją įsiminkite.
              Pasirinktų nuotraukų kiekį galite matyti aukščiau esančiame langelyje. Sekančiame
              žingsnyje reikės patvirtinti įvestą slaptažodį pasirenkant tokią pat nuotraukų seką.
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
          <div>
            <TextField
              disabled = {true}
              error={isError}
              fullWidth
              id="password"
              type="password"
              value = {passConfirmSymbols}
              label="Pakartotas slaptazodis"
              placeholder="Slaptazodis"
              margin="normal"
              helperText={helperText}
            />
          </div>
          <div>
          <GridList cellHeight={window.innerHeight*0.15} cols={5}>
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
              setPassConfirmSymbols("");
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
              
              registerEvent(username, password);
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

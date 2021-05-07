import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { UpdatePWCall, VerifyResetToken } from './APICalls';
import PhotoCodes from '../General/Types';
import { withRouter } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import {GridList, GridListTile} from '@material-ui/core';
const queryString = require('query-string');


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

export const Reset = (props: any) => {


  const verifyValidToken = async () => {

    let queries = queryString.parse(props.location.search);
    if(queries.email && queries.token && queries.purpose)
    {
        
        var data = await VerifyResetToken(queries.token);
        if(data == false)
        {
            return props.history.push('/login');
        }
    }
    else{
        return props.history.push('/login');
    }
        

        
  }
  

  const classes = useStyles();



  window.addEventListener("resize", function() {
    console.log("Test");
    return window.innerHeight;
  });

  const[password, setpassword] = useState("");
  const[passSymbols, setPassSymbols] = useState("");
  const[confirmPassword, setconfirmPassword] = useState("");
  const[passConfirmSymbols, setPassConfirmSymbols] = useState("");
  const[helperText, sethelperText] = useState("");
  const[isButtonDisabled, setisButtonDisabled] = useState(false);
  const[isError, setisError] = useState(false);
  const[errorCode, setErrorCode] = useState("");
  const[tutorialText, setTurorialText] = useState(false);

const resetEvent = async (password : string) => {
    if(confirmPassword != password)
    {
      setisError(true);
      setErrorCode("Slaptazodziai nesutampa.")
      return;
    }
    let queries = queryString.parse(props.location.search);
    const retCode = await UpdatePWCall(queries.token, password);
    console.log(retCode);
    if(retCode == true)
    {
      setisError(false);
      props.history.push('/login');
    }
    else
    { 
      setErrorCode("Nustatyti iš naujo nepavyko, bandykite dar kartą.")
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


    verifyValidToken();
    return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Naujas slaptažodis" />
        <CardContent >
          <div>
            {isError && <Alert severity="error">{errorCode}</Alert>}
          </div>
          <div >
            <TextField 
              error={isError}
              fullWidth
              id="password"
              type="password"
              value = {passSymbols}
              label="Naujas slaptazodis"
              placeholder="Slaptazodis"
              margin="normal"
              helperText={helperText}
            />
            <img src={process.env.PUBLIC_URL+ "questionmark.png"} width="25" height="25" onClick= {() => {setTurorialText(!tutorialText)}} />
            {tutorialText && <p style = {{outline: '5px dotted green'}}>
              <h2>Pagalba</h2>
              Norėdami nustatyti slaptažodį iš naujo - pasirinkite naują norimą nuotraukų
              seką ir ją sekančiame žingsnyje pakartokite. Atlikę nuotraukų pasirinkimus -
               spauskite mygtuką "Nustatyti iš naujo".
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
              
              resetEvent(password);
            }}
            disabled={isButtonDisabled}>
            Nustatyti iš naujo
          </Button>
        </CardActions>
      </Card>
    </form>
    )
    
  }

  export default Reset;

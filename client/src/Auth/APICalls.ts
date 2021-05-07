import { AccordionSummary } from '@material-ui/core';
import Axios from 'axios';

export function SayHello()
{
    const response = Axios.get('api/hello');
    return response;
}

export async function register(name: string, password: string)
{
    try{
        const data = await Axios.post('/api/register', {
            name: name,
            password: password
        });
        if(data.data.success == true)
            return true;
        else return false;
    }
    catch(err)
    {
        return false;
    }
}

export async function LoginCall(name: string, password: string)
{
    try{

        const data = await Axios.post("/api/login", {
            name: name,
            password: password
        });
        console.log(data);
        if(data.data.success == true)
            return {token: data.data.token, name: data.data.user};
        else return false;
    }
    catch(err)
    {
        return false;
    }
}

export async function UpdatePWCall(token: string, newPass:string)
{
    try{
        let data = await Axios.post(`/api/updatepassword`, {
            token: token,
            password: newPass 
        })
        console.log(data);
        if(data.data.error == true)
            return false;
        else return true;
    }
    catch(err){
        return false;
    }
}

export function ResetPwCall(email : string, purpose: string){
    try{
        Axios.get(`/api/resetpwemail?email=${email}&purpose=${purpose}`);
    }
    catch(err){
        return false;
    }
}

export async function VerifyResetToken(token: string){
    try {
        const data = await Axios.get(`/api/verifyresettoken?token=${token}`);
        if(data.data.error == false && data.data.success == true)
        {
            return true;
        }
        else return false;
    }
    catch(err)
    {
        return false;
    }
}

export async function VerifyToken(token: string){
    try {
        const data = await Axios.get(`/api/verifyToken?token=${token}`);
        if(data.data.error == false)
        {
            return {token: data.data.token, name: data.data.name};
        }
        else return false;
    }
    catch(err)
    {
        return false;
    }
}
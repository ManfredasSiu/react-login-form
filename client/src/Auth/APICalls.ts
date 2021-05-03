import Axios from 'axios';

export function SayHello()
{
    const response = Axios.get('api/hello');
    return response;
}

export async function CreateUser(name: string, password: string)
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
            return {token: data.data.token, name: data.data.name};
        else return false;
    }
    catch(err)
    {
        return false;
    }
}

export async function VerifyToken(token: string,){
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
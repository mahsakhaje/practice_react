import '../index.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [userInfo, setUserInfo] = useState({ userName: '', password: '' });
    let navigate = useNavigate();

    function handleRegister() {

        navigate("/play");
    }
    return (
        <div className='p-6  m-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg  items-center space-x-4 flex flex-col space-y-4'>

            <form class="items-center justify-center space-y-2" action="#" method="POST">

                <p className="text-xl font-medium text-red">login</p>

                <p>username</p>
                <TextField id="outlined-basic" label="username" variant="outlined" onChange={(e) => {
                    setUserInfo((prevValues) => ({ ...prevValues, userName: e.target.value }));
                }}

                />
                <p>password</p>
                <TextField id="outlined-basic" label="password" variant="outlined" onChange={(e1) => {
                    setUserInfo((prevValues) => ({ ...prevValues, password: e1.target.value }));
                }
                } />
                <p></p>
                <Button variant="contained" onClick={() => {

                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    if (userInfo.password && userInfo.userName) {
                        handleRegister();
                    } else {
                        alert('لطفا ابتدا اطلاعات حساب کاربری خود را تکمیل کنید')
                    }

                }}>confirm</Button>

            </form>

        </div>
    );
}


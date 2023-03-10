

import '../index.css';
import Button from '@mui/material/Button';
import { useLocalStorage } from '../logic/localStorage';
import { useNavigate } from "react-router-dom";


export default function Play(props) {
    let navigate = useNavigate();

    // const info = JSON.parse(localStorage.getItem('userInfo'));
    function handlePlay() {
        navigate("/game");
      }
    const {value:userInfo} = useLocalStorage('userInfo')
    const lastScore = localStorage.getItem('lastScore');


    return (
        <div className='p-6  m-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg  items-center space-x-4 flex flex-col space-y-4'>
            <p className="text-xl font-medium text-black "> عزیز خوش آمدی {JSON.parse(userInfo)?.username}</p>
            <p className="text-slate-500  " m-6>  آخرین امتیاز بدست آورده ی شما: {lastScore ? lastScore : '0'}</p>

            <Button variant="contained" onClick ={handlePlay}>lets play</Button>
        </div>
    );



}
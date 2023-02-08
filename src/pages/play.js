

import '../index.css';
import Button from '@mui/material/Button';

export default function Play(props) {
    const info = JSON.parse(localStorage.getItem('userInfo'));
    const lastScore = JSON.parse(localStorage.getItem('lastScore'));

    console.log(info);

    return (
        <div className='p-6  m-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg  items-center space-x-4 flex flex-col space-y-4'>
            <p className="text-xl font-medium text-black "> عزیز خوش آمدی {info.userName}</p>
            <p className="text-slate-500  " m-6>  آخرین امتیاز بدست آورده ی شما: {lastScore ? lastScore : '0'}</p>

            <Button variant="contained">lets play</Button>
        </div>
    );


}
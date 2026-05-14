import '../assets/Auth.css'
import { Outlet, Navigate } from 'react-router-dom';

export default function Auth(){
    return(
        <div className="Main-container-auth">
            <Outlet/>
        </div>
    );
}
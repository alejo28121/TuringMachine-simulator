import {useState} from 'react';
import '../assets/Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { 
    Eye,
    EyeClosed,
    Loader
} from "lucide-react";

function Login(){
    const [datesValue, setdatesValue] = useState({
        user: '',
        password: '',
    }); 
    const navigate = useNavigate();
    const [visibilityValue, setvisibilityValue] = useState(true); 
    const [errorState, setErrorState] = useState("");
    const [loading, setLoading] = useState(false);
    const sendDates = async (e) => {
        e.preventDefault();
        setLoading(true)
        setErrorState("")
        const start = Date.now();
        try{
            const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(datesValue)
            });
            const elapsed = Date.now() - start;
            const minTime = 400;

            if (elapsed < minTime) {
                await new Promise(res => setTimeout(res, minTime - elapsed));
            }
            if(response.status === 200){
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setErrorState("")
                navigate('/dashboard');
            }else if (response.status === 401) {
                setErrorState("Usuario o contraseña incorrectos.");

            } else {
                setErrorState("Error del servidor. Intenta más tarde.");
            }
        }
        catch(error){
            setErrorState("Error de conexión. Intenta nuevamente.");
        }
        finally{
            setLoading(false)
        }
    };
    return( 
        <div className="Main-container-login">
            <div className="textUserContent">
                <span className='IngresarT'>Ingresar</span>
            </div>
            <form onSubmit={sendDates} className='Form-login'>
                <div className="inputContainer">
                    <div className='Label-container'>
                        <label className='User-label'>Usuario</label>
                    </div>
                    <div className='user-container'>
                        <input className="inputUser" placeholder="Usuario" onChange={(e) => 
                            setdatesValue(prev => ({
                                ...prev,
                                user: e.target.value
                            }))
                        } required></input>
                    </div>
                </div>
                <div className="inputContainer">
                    <div className='Label-container'>
                        <label className='Password-label'>Contraseña</label>
                    </div>
                    <div className='password-container'>
                        <input type={visibilityValue ? "password" : "text"} className="inputPassword" id="inputPassword" placeholder="Contraseña" onChange={
                            (e) =>
                            setdatesValue(prev => ({
                                ...prev,
                                password: e.target.value
                            }))
                        } required></input>
                        <button className='viewPassword' type='button' data-label={visibilityValue ? "Ver contraseña" : "Ocultar contraseña"} onClick={
                            (e) => {
                            setvisibilityValue(prev => !prev)
                            }}>
                            <Eye className='visibilityIcon' size={25}
                            style={{
                                display: visibilityValue ? "block" : "none"
                            }}/>
                            <EyeClosed className='visibilityIcon-off' size={25}
                            style={{
                                display: visibilityValue ? "none" : "block"
                            }}/>
                        </button>
                    </div>
                </div>
                {errorState && (
                    <div className="Error-container">
                        <span>{errorState}</span>
                    </div>
                )}
                <div className="buttonContent">
                    <button className="ButtonIn" type='submit' disabled={loading}>
                        {loading ? "Ingresando..." : "Ingresar"} 
                        {loading && <Loader size={25} className='spining-icon'/>}
                    </button>
                </div>
            </form>
            <div className="createContent">
                <span className='questionText'>Aun no tienes cuenta?</span>
                <Link className="CreateAccount" to="/auth/register">Registrar</Link>
            </div>
        </div>
    );
}
export default Login;
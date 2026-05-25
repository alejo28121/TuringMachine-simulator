import { useState } from 'react';
import '../assets/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeClosed, Loader } from "lucide-react";

function Register() {

    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [visibilityValue, setVisibilityValue] = useState(true);
    const [errorState, setErrorState] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const sendRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorState("");

        const start = Date.now();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValue)
            });

            const elapsed = Date.now() - start;
            const minTime = 400;

            if (elapsed < minTime) {
                await new Promise(res => setTimeout(res, minTime - elapsed));
            }

            if (response.status === 201 || response.status === 200) {
                const data = await response.json();

                localStorage.setItem('token', data.token);

                setErrorState("");
                navigate('/dashboard');

            } else if (response.status === 409) {
                setErrorState("El usuario ya existe.");
            } else {
                setErrorState("Error del servidor. Intenta más tarde.");
            }

        } catch (error) {
            setErrorState("Error de conexión. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Main-container-login">

            <div className="textUserContent">
                <span className='IngresarT'>Crear cuenta</span>
            </div>

            <form onSubmit={sendRegister} className='Form-login'>
                <div className="inputContainer">
                    <div className='Label-container'>
                        <label className='User-label'>Nombre</label>
                    </div>
                    <div className='user-container'>
                        <input
                            className="inputUser"
                            placeholder="Nombre completo"
                            onChange={(e) =>
                                setFormValue(prev => ({ ...prev, name: e.target.value }))
                            }
                            required
                        />
                    </div>
                </div>
                <div className="inputContainer">
                    <div className='Label-container'>
                        <label className='User-label'>Usuario o Email</label>
                    </div>
                    <div className='user-container'>
                        <input
                            className="inputUser"
                            placeholder="Correo o usuario"
                            onChange={(e) =>
                                setFormValue(prev => ({ ...prev,  email: e.target.value }))
                            }
                            required
                        />
                    </div>
                </div>
                <div className="inputContainer">
                    <div className='Label-container'>
                        <label>Contraseña</label>
                    </div>

                    <div className='password-container'>
                        <input
                            type={visibilityValue ? "password" : "text"}
                            className="inputPassword"
                            placeholder="Contraseña"
                            onChange={(e) =>
                                setFormValue(prev => ({ ...prev, password: e.target.value }))
                            }
                            required
                        />

                        <button
                            type='button'
                            className='viewPassword'
                            onClick={() => setVisibilityValue(prev => !prev)}
                        >
                            <Eye
                                size={25}
                                style={{ display: visibilityValue ? "block" : "none" }}
                            />
                            <EyeClosed
                                size={25}
                                style={{ display: visibilityValue ? "none" : "block" }}
                            />
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
                        {loading ? "Creando cuenta..." : "Registrarse"}
                        {loading && <Loader size={25} className='spining-icon' />}
                    </button>
                </div>

            </form>

            <div className="createContent">
                <span className='questionText'>¿Ya tienes cuenta?</span>
                <Link className="CreateAccount" to="/login">Ingresar</Link>
            </div>

        </div>
    );
}

export default Register;
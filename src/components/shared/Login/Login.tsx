import './Login.css';
import { useState } from "react"
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [showMsg, setShowMsg] = useState(false);
    const [textMsg, setTextMsg] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await login(user.email, user.password);
            setShowMsg(false);
            navigate('/');
        } catch (err) {
            if (user.email == '' || user.password == '') {
                setTextMsg("Debe digitar ambos campos")
            }
            else {
                setTextMsg("Contraseña o correo incorrectos")
            }
            setShowMsg(true);
        }
    }

    const hideMsg = () => {
        setShowMsg(false);
    }

    const goToRegister = () => {
        navigate('/register');
    }

    return (
        <div className='login-main-container'>
            <div className='login-img-container'>
                <div className='login-img'></div>
            </div>
            <div className='login-title-form-container'>
                <div className='login-title-container'>
                    <h2>¡Hola!</h2>
                    <h4>Qué gusto verte de nuevo</h4>
                </div>
                <form className='login-form-container' onSubmit={handleSubmit}>
                    <h3 className='login-title-form'>Inicia sesión con tu cuenta</h3>
                    <div className='email-form-name-container'>
                        <label htmlFor="loginEmail">Correo electrónico</label>
                        <input id='loginEmail' type="email" name='email' onChange={handleChange} />
                    </div>
                    <div className='password-form-name-container'>
                        <label htmlFor="loginPassword">Contraseña</label>
                        <input id='loginPassword' type="password" name='password' onChange={handleChange} />
                    </div>
                    {
                        showMsg &&
                        <div className='msg-alert msg-mt-10'>
                            <p>{textMsg}</p>
                            <button onClick={hideMsg}>X</button>
                        </div>
                    }
                    <input className='login-main-button' type="submit" value="Entrar" />
                    <a className='login-register-button' onClick={goToRegister}>Registrarse</a>
                </form>
            </div>
        </div>
    );
}

export default Login;

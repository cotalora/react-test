import './Register.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({
        firtsName: "",
        secondName: "",
        firtsLastName: "",
        secondLastName: "",
        documentNumber: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showMsg, setShowMsg] = useState(false);

    const { signup } = useAuth();

    const navigate = useNavigate();

    const handleChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
        setIsPasswordValid(false)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (user.password == user.passwordConfirm) {
            try {
                await signup(user);
                setIsPasswordValid(false);
                setShowMsg(false);
                navigate('/');
            } catch (err) {
                setShowMsg(true);
            }
        }
        else {
            setIsPasswordValid(true);
        }
    }

    const hideMsg = () => {
        setShowMsg(false);
    }

    const goToBack = () => {
        navigate('/login');
    }

    return (
        <form className='register-main-container' onSubmit={handleSubmit}>
            <div className='head-card'>
                <h2>Registro de usuario</h2>
            </div>
            <div className='body-card flex-grid'>
                <div className='col-1'>
                    <TextField
                        required
                        id="firtsName"
                        name="firtsName"
                        label="Primer nombre"
                        onChange={handleChange}
                    />
                </div>
                <div className='col-1'>
                    <TextField
                        id="secondName"
                        name="secondName"
                        label="Segundo nombre"
                        onChange={handleChange}
                    />
                </div>
                <div className='col-1'>
                    <TextField
                        required
                        id="firtsLastName"
                        name="firtsLastName"
                        label="Primer apellido"
                        onChange={handleChange}
                    />
                </div>
                <div className='col-1'>
                    <TextField
                        id="secondLastName"
                        name="secondLastName"
                        label="Segundo apellido"
                        onChange={handleChange}
                    />
                </div>
                <div className='col-1'>
                    <TextField
                        required
                        id="documentNumber"
                        name="documentNumber"
                        label="Número de documento"
                        type="number"
                        onChange={handleChange}
                    />
                </div>
                <div className='col-3'>
                    <TextField
                        required
                        id="email"
                        name="email"
                        type="email"
                        label="Correo electrónico"
                        onChange={handleChange}
                    />
                </div>
                <div className='col-2'>
                    <TextField
                        required
                        error={isPasswordValid}
                        id="password"
                        name="password"
                        label="Contraseña"
                        type="password"
                        onChange={handleChange}
                    />
                </div>
                <div className='col-2'>
                    <TextField
                        required
                        error={isPasswordValid}
                        id="passwordConfirm"
                        name="passwordConfirm"
                        label="Confirmación de contraseña"
                        type="password"
                        onChange={handleChange}
                    />
                </div>
                {
                    showMsg &&
                    <div className='col-4'>
                        <div className='msg-alert'>
                            <p>Error al crear el usuario</p>
                            <button onClick={hideMsg}>X</button>
                        </div>
                    </div>
                }
            </div>
            <div className='footer-card'>
                <button className='register-back-button' onClick={goToBack}>Atrás</button>
                <input className='register-main-button' type="submit" value="Registrar" />
            </div>
        </form>
    )
}

export default Register;
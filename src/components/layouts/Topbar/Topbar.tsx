import '../Topbar/Topbar.css';
import menuImg from "../../../assets/menu.png";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAuth } from "../../../context/authContext";
import { useNavigate } from 'react-router-dom';


function Topbar(props:any) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSignOut = async () => {
        await logout();
        navigate('/login');
        sessionStorage.removeItem('info');
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <div className='topbar-container'>
            <span className='name-container'>Hola, <b>{props.user.firtsName} {props.user.firtsLastName}</b></span>
            <div className='separator-container'></div>
            <button className='button-container' onClick={handleOpen}>
                <img id='img-menu' src={menuImg} />
            </button>

            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 600 }}>
                    <h2 id="child-modal-title">Atención</h2>
                    <p id="child-modal-description">
                        Está seguro que desea cerrar sesión
                    </p>
                    <div className='button-container-modal'>
                        <button className='register-back-button' onClick={handleClose}>Cancelar</button>
                        <button className='register-main-button' onClick={handleSignOut}>Sí, salir</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Topbar;

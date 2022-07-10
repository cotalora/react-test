import './HomeAdmin.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../../firebase";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

function HomeAdmin() {
    const [rows, setRows] = useState([]);
    const [rowsUsers, setRowsUsers] = useState([]);
    const casesCollectionRef = collection(db, "cases");
    const usersCollectionRef = collection(db, "users");
    const [showingCases, setShowingCases] = useState(true);
    const [showingRegister, setShowingRegister] = useState(false);

    const getCases = async () => {
        const q = query(casesCollectionRef);
        const da = await getDocs(q);
        let auxRows: any = []
        da.forEach((doc) => {
            let info = {
                ...doc.data(),
                id: doc.id
            }
            auxRows.push(info);
            setRows(auxRows);
        });
    }

    const getUsers = async () => {
        const q = query(usersCollectionRef, where('role', '==', 2));
        const da = await getDocs(q);
        let auxRows: any = []
        da.forEach((doc) => {
            let info = {
                ...doc.data(),
                id: doc.id
            }
            auxRows.push(info);
            setRowsUsers(auxRows);
        });
    }

    useEffect(() => {
        getCases();
        getUsers();
    }, []);

    const showCases = () => {
        setShowingCases(true);
        setShowingRegister(false);
    }

    const showRegister = () => {
        setShowingCases(false);
        setShowingRegister(true);
    }

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

    const { signupAdmin } = useAuth();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (user.password == user.passwordConfirm) {
            try {
                await signupAdmin(user);
                setIsPasswordValid(false);
                setShowMsg(false);

                getUsers();
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

    return (
        <div className='home-container'>
            <div className='left-menu-container'>
                <div className='left-menu-option'>
                    <button onClick={showCases}>Ver registro de casos</button>
                </div>
                <div className='left-menu-option'>
                    <button onClick={showRegister}>Registrar doctores</button>
                </div>
            </div>
            {
                (
                    rows.length == 0 && showingCases &&
                    <div className='card-container card-container--ml-15'>
                        <div className='body-card'>
                            <div className='col-4'>
                                <h3>Lo sentimos, no hay resultados de casos</h3>
                            </div>
                        </div>
                    </div>
                ) ||
                (rows.length > 0 && showingCases &&
                    <div className='card-container card-container--ml-15'>
                        <div className='body-card'>
                            <div className='col-4 table-container'>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>Paciente</b></TableCell>
                                                <TableCell align="right"><b>Azúcar</b></TableCell>
                                                <TableCell align="right"><b>Grasa</b></TableCell>
                                                <TableCell align="right"><b>Oxígeno</b></TableCell>
                                                <TableCell align="right"><b>Diagnóstico</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row: any) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.name} - {row.documentNumber}
                                                    </TableCell>
                                                    <TableCell align="right">{row.sugar}%</TableCell>
                                                    <TableCell align="right">{row.fat}%</TableCell>
                                                    <TableCell align="right">{row.oxigen}%</TableCell>
                                                    <TableCell align="right">{row.diagnostic}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>) ||

                (
                    showingRegister &&
                    <div>
                        <div>
                            <form className='card-container card-container--ml-15' onSubmit={handleSubmit}>
                                <div className='head-card-m'>
                                    <h2>Registro de usuario doctor</h2>
                                </div>
                                <div className='body-card'>
                                    <div className='flex-grid'>
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
                                </div>
                                <div className='footer-card'>
                                    <div></div>
                                    <input className='register-main-button' type="submit" value="Registrar" />
                                </div>
                            </form>

                            {
                                rowsUsers.length > 0 &&
                                <div className='card-container card-container--ml-15'>
                                    <div className='body-card'>
                                        <div className='col-4 table-container'>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell><b>Nombre</b></TableCell>
                                                            <TableCell><b>Número de documento</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rowsUsers.map((row: any) => (
                                                            <TableRow
                                                                key={row.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {row.firtsName} {row.firtsLastName}
                                                                </TableCell>
                                                                <TableCell>{row.document}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                rowsUsers.length == 0 && showingRegister &&
                                <div className='card-container card-container--ml-15'>
                                    <div className='body-card'>
                                        <div className='col-4'>
                                            <h3>Lo sentimos, no hay resultados de usuarios</h3>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default HomeAdmin;
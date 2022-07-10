import './HomeDoctor.css';
import { useAuth } from "../../../context/authContext";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../../firebase";

function HomeDoctor() {
    const [showMsg, setShowMsg] = useState(false);
    const [rows, setRows] = useState([]);
    const [casee, setCasee] = useState({
        diagnostic: "",
        documentNumber: "",
        fat: null,
        idAuth: "",
        name: "",
        oxigen: null,
        sugar: null
    });
    const casesCollectionRef = collection(db, "cases");
    const usersCollectionRef = collection(db, "users");

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

    const addCases = async (data: any) => {
        addDoc(
            casesCollectionRef,
            {
                diagnostic: data.sugar > 70 && data.fat > 88.5 && data.oxigen < 60 ? 'Alto' : data.sugar >= 50 && data.sugar <= 70 && data.fat >= 62.2 && data.fat <= 88.5 && data.oxigen >= 60 && data.oxigen <= 70 ? 'Medio' : 'Bajo',
                documentNumber: data.documentNumber,
                fat: data.fat,
                idAuth: data.idAuth,
                name: data.name,
                oxigen: data.oxigen,
                sugar: data.sugar
            }
        )
        getCases();
    }

    const handleChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setCasee({
            ...casee,
            [name]: value
        });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const q = query(usersCollectionRef, where('document', '==', casee.documentNumber));
            const da = await getDocs(q);
            if (da.empty) {
                setShowMsg(true);
            }
            else {
                setShowMsg(false);
                da.forEach((doc) => {
                    let request = {
                        diagnostic: casee.diagnostic,
                        fat: casee.fat,
                        oxigen: casee.oxigen,
                        sugar: casee.sugar,
                        name: doc.data().firtsName + ' ' + doc.data().firtsLastName,
                        documentNumber: doc.data().document,
                        idAuth: doc.data().idAuth,
                    };
                    addCases(request);
                    event.target.reset()
                });
            }
        } catch (err) {

        }
    }

    const hideShowMsg = () => {
        setShowMsg(false);
    }

    useEffect(() => {
        getCases();
    }, []);

    return (
        <div className='home-container-doc'>
            <form className='card-container' onSubmit={handleSubmit}>
                <div className='head-card-m'>
                    <h2>Registro de caso</h2>
                </div>
                <div className='body-card'>
                    <div className='flex-grid'>
                        <div className='col-1'>
                            <TextField
                                required
                                id="sugar"
                                name="sugar"
                                type="number"
                                label="Azúcar"
                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-1'>
                            <TextField
                                required
                                id="fat"
                                name="fat"
                                type="number"
                                label="Grasa"
                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-1'>
                            <TextField
                                required
                                id="oxigen"
                                name="oxigen"
                                type="number"
                                label="Oxígeno"
                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-1'>
                            <TextField
                                required
                                id="documentNumber"
                                name="documentNumber"
                                type="number"
                                label="Número de documento del paciente"
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={handleChange}
                            />
                        </div>
                        {
                            showMsg &&
                            <div className='col-4'>
                                <div className='msg-alert'>
                                    <p>Paciente no encotrado</p>
                                    <button onClick={hideShowMsg}>X</button>
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
                rows.length > 0 &&
                <div className='card-container'>
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
                </div>
            }
        </div>
    )
}

export default HomeDoctor;
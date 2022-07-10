import './HomeUser.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../../firebase";
import { useAuth } from '../../../context/authContext';

function HomeUser() {
    const [rows, setRows] = useState([]);
    const casesCollectionRef = collection(db, "cases");
    const { user } = useAuth();

    const getCases = async () => {
        const q = query(casesCollectionRef, where('idAuth', '==', user.idAuth));
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

    useEffect(() => {
        getCases();
    }, []);

    return (
        <div className='home-container-usr'>
            {
                (rows.length > 0 &&
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
                    </div>) ||

                (rows.length == 0 &&
                    <div className='card-container'>
                        <div className='body-card'>
                            <div className='col-4'>
                                <h3>Lo sentimos, no hay resultados</h3>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default HomeUser;
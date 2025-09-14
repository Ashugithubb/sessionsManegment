"use client"
import { useEffect } from "react";
import Navbar from "../component/navbar";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { getMySessionThunk } from "../redux/slice/my.session.slice";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SocketComponent from "../component/socket";

export default function DashBoard() {
    const sessions = useAppSelector((state) => state.myfeedback.sessionlist);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getMySessionThunk());
    }, [])
    return (
        <>
            <Navbar />
    <SocketComponent/>
            <Typography sx={{display:"flex",justifyContent:"center"}}>SESSIONS LOGS</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>SessionId</TableCell>
                            <TableCell >Device</TableCell>
                            <TableCell align="right">IP Address</TableCell>
                             <TableCell align="right">Time Stemp</TableCell>
                            <TableCell align="right">Is Active</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessions.map((row) => (
                            <TableRow
                                key={row.sessionId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                               <TableCell component="th" scope="row">{row.sessionId}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.device}
                                </TableCell>
                                <TableCell align="right">{row.IpAddress}</TableCell>
                                <TableCell align="right">{row.loginTime}</TableCell>
                                <TableCell align="right">{row.isActive===true ? (<Typography>YES</Typography>):(<Typography>NO</Typography>)}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
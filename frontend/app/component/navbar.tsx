'use client';
import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useRouter } from "next/navigation";


import { error } from 'console';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { Button } from '@mui/material';
import axios from 'axios';

const Navbar: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
   
    useEffect(() => {
       
    }, [dispatch]);
    const token = useAppSelector((state) => state.login.auth);

 
    const handelLogoutClick = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,{ withCredentials: true });
           document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            router.push('/login');
        }
        catch (err) { 
            console.log(err)
        }
    }
    const handelLoginClick = () => {
        router.push('/login')
    }

    return (
        <AppBar position="static" color="secondary" >
            <Toolbar>
                <Box display="flex" alignItems="center" gap={1}>
                    <Image
                        src="https://framerusercontent.com/images/VUqdevjirDo8kn502U0VpXsVw.svg?scale-down-to=2048"
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                    <Typography variant="h6" noWrap>
                        Session Loop
                    </Typography>
                </Box>

                <Box flexGrow={1} />
                <Box sx={{ display: "flex", gap: 2 }}>
                    {token===undefined ? (
                        <Button onClick={handelLoginClick} variant="contained">
                            Log in
                        </Button>
                    ) : (
                        <Button onClick={handelLogoutClick} variant="contained">
                            Log out
                        </Button>
                    )}
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <Avatar
                        // alt={profile?.userName}
                        // src={profile?.email}
                        sx={{ cursor: 'pointer' }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
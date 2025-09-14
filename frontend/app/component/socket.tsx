
import { Typography, useStepContext } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import io, { Socket } from 'socket.io-client';
import AlertDialog from './enter-code-dailog';
import DisplayAlertDialog from './display-code-dailog';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { setBackendOtp } from '../redux/slice/socket.slice';
const SocketComponent = () => {
  const [frontendSessionId,setFrontendSessionId] = useState("");
  const [backendSessionId, setBackendSessionId] = useState<string>("");

  const [open,setOpen] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const otp = useAppSelector((state)=>state.code.otp);

  const dispatch = useAppDispatch();

  useEffect(() => {
  socketRef.current = io("http://localhost:3001", {
    withCredentials: true 
  });

  socketRef.current.on("connect", () => {
    console.log("Connected to WebSocket server");
  });

  socketRef.current.on("secondSession", (data: any) => {
    
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('connect.sid='))?.split('=')[1];
    const signedPart = cookieValue?.startsWith("s:") ? cookieValue.slice(2) : cookieValue;
    const [cookieSessionId, signature] = signedPart?.split('.') ?? [];
    setFrontendSessionId(cookieSessionId);

    const otp = data.otp;
    const sessionId=data.sessionId
    console.log("otp",otp);
    dispatch(setBackendOtp(otp));
    console.log("sessionId",sessionId);
    setBackendSessionId(sessionId);
    setOpen(true);


  });
}, []);

  const sendMessage = () => {
    if (socketRef.current) {
      console.log("otp entered by client1",otp);
      socketRef.current.emit("sendMessage", otp);
    }
  };
  useEffect(() => {
  if (otp !== null && otp !== "") {  
    sendMessage();
  }
}, [otp]);
  return (
    
    <div>
    
       <ToastContainer />
       {"s%3A"+backendSessionId === frontendSessionId ? (
      <AlertDialog />
    ) : backendSessionId.length > 0 ? (
      <DisplayAlertDialog/>
    ) : null}
       
    </div>
  );
};

export default SocketComponent;
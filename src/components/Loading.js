import React from "react"
import Box from "@mui/material/Box"
import Logo from "../assets/logo.png"
import { keyframes } from '@emotion/react';

const logoAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export default function LoadingComponent() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAA0A0',
      }}
    >
      <Box
        component="img"
        src={Logo}
        alt="logo"
        sx={{
          maxWidth: '100px',
          animation: `${logoAnimation} 2s infinite`,
        }}
      />
    </Box>
  );
}

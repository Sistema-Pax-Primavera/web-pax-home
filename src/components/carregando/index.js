import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './carregando.css'

const Carregando = ({ message }) => {
    return (
        <div className='carregando '>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress color="success" />
            </Box>
            <label>{message}</label>
        </div>

    )
}

export default Carregando

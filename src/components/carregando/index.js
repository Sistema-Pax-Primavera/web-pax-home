import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './carregando.css'

const Carregando = () => {
    return (
        <div className='carregando '>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress color="success" />
            </Box>
            <label>Carregando</label>
        </div>

    )
}

export default Carregando

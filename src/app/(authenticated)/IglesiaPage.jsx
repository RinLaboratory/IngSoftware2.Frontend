import React from 'react';
import { Box } from '@chakra-ui/react'
import Sidebar from './componentes/Sidebar/Sidebar';
import Contents from './componentes/index/contents';

export const IglesiaPage = () => {

  return (
    <Box>
      <Sidebar actual={"Tablero Principal"}/>
      <Contents />
    </Box>
  )
}
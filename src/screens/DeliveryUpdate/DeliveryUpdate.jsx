import React from 'react'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import ContainerBox from '../../components/Cart/ContainerBox';

const DeliveryUpdate = () => {
  return (
    <ContainerBox>
      <Typography>
      You have selected the "Share Meal" option. You can click on the below link to donate food 
    </Typography>
    <Link component="button" variant="body2" to={"/"}>Click here to donate food</Link>
    </ContainerBox>
  )
}

export default DeliveryUpdate
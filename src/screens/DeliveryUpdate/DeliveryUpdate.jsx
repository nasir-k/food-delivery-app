import React from 'react'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import ContainerBox from '../../components/Cart/ContainerBox';
import orderPlacedImage from "../../assets/food-order-icon.png";
import  "./DeliveryUpdate.css";

const DeliveryUpdate = () => {
  return (
    <ContainerBox>
      <p className="order-placed-text">Your order is delivered!
        <span>
          <img src={orderPlacedImage} className="order-image"></img>
        </span>
      </p>
      <Typography sx={{fontSize: "2rem", fontFamily: "cursive"}}>
      You have selected the "Share Meal" option. You can click on the below link to donate food 
      </Typography>
      <Link component="button" variant="body2" to={"/donate-confirm"}>Click here to donate food</Link>
    </ContainerBox>
  )
}

export default DeliveryUpdate
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ContainerBox from '../../components/Cart/ContainerBox';
import { useNavigate } from 'react-router-dom';

const ConfirmDonateScreen = () => {
  const [timeSlot, setTimeSlot] = useState('09:00-12:00');
  const [isDonate, setIsDonate] = useState(false);
  const navigate = useNavigate();
  const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

  const handleChange = (event) => {
    setTimeSlot(event.target.value);
  };

  const donateFoodHandler =()=>{
    setIsDonate(true);
  }

  const postOrderDetails = async (orderDetails)=>{
    await fetch(
      "https://55i53iuqk9.execute-api.ap-south-1.amazonaws.com/prod/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      }
    )
      .then((response) => {
        // Handle response
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  const submitDonateFoodHandler=()=>{
    const {city, name, postalCode, street} =  JSON.parse(localStorage.getItem('userData'));

    console.log(city, name, postalCode, street);
   
    const orderData ={

      "latitude2": "78.9012",

      "latitude1": "90.1234",

      "longitude2": "12.3456",

      "orderType": "grocery",

      "longitude1": "34.5678",

      "distance": "5.5",

      "handlerId": "12345",

      "status": "delivered",

      "pickupLocation": street +" "+ city +" "+ postalCode,

      "mobile": "0987654321",

      "ngoId": "98765",

      "customerLocation": "changed address",

      "deliveryLocation": "123 Main St",

      "customerName": name

}
    postOrderDetails(orderData);
    console.log(orderData)
    localStorage.removeItem('userData');
    navigate('/thankyou-page');

  }

  return (
    <ContainerBox>
      <ThemeProvider theme={theme}>
          <Typography variant="h3" sx={{marginBottom: "1rem"}}>🌟 Help Fight Hunger! 🍽️</Typography>
          <Typography sx={{marginBottom: "2rem"}}>{!isDonate ? "We invite you to make a difference in someone's life. Would you like to donate leftover/packed food to feed the hungry?": "Your kindness can bring hope and nourishment to those in need. Together, let's combat hunger and create a brighter future. Thank you for your consideration!"}    
      </Typography>
      {!isDonate && <Box>
        <Button variant="contained" sx={{backgroundColor:"#8a2b06", marginRight:"1rem"}} onClick={donateFoodHandler}>Yes</Button>
        <Button variant="outlined" sx={{color:"#8a2b06", borderColor:"#8a2b06"}} onClick={()=> navigate("/meals")}>No</Button>
      </Box>}
      </ThemeProvider>
      {isDonate && <FormControl sx={{display:"block"}}>
        <FormLabel id="demo-controlled-radio-buttons-group">Select time to pickup food</FormLabel>
        <RadioGroup
          name="controlled-radio-buttons-group"
          value={timeSlot}
          onChange={handleChange}
        >
          <FormControlLabel value="09:00-12:00" control={<Radio />} label="09:00-12:00" />
          <FormControlLabel value="12:00-15:00" control={<Radio />} label="12:00-15:00" />
          <FormControlLabel value="15:00-18:00" control={<Radio />} label="15:00-18:00" />
          <FormControlLabel value="18:00-21:00" control={<Radio />} label="18:00-21:00" />
          <FormControlLabel value="21:00-00:00" control={<Radio />} label="21:00-00:00" />
        </RadioGroup>
        <Button variant="contained" sx={{backgroundColor:"#8a2b06", marginRight:"1rem"}} onClick={submitDonateFoodHandler}>Confirm</Button>
        <Button variant="outlined" sx={{color:"#8a2b06", borderColor:"#8a2b06"}} onClick={()=> navigate("/meals")}>Cancel</Button>
      </FormControl>}
    </ContainerBox>
  )
}

export default ConfirmDonateScreen
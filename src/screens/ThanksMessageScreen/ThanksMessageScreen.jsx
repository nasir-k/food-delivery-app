import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ContainerBox from '../../components/Cart/ContainerBox'
import { useNavigate } from 'react-router-dom'

const ThanksMessageScreen = () => {
  const [isFoodPicked, setIsFoodPicked] = useState(false);
  const navigate = useNavigate();

  setTimeout(()=>{
    setIsFoodPicked(true);
  },5000);

  return (
    <ContainerBox>   
        {!isFoodPicked &&
        <Box>
          <Typography variant="h3" sx={{marginBottom: "1rem"}}>🌟 Thank you for your generosity! 🙏🍽️</Typography>
          <Typography>
                  Your decision to donate food is truly inspiring. A representative from our NGO will be coming to collect the food during the time slot you selected. Your contribution will help feed the hungry and make a meaningful impact.

                  We sincerely appreciate your compassion and support. Together, we can make a difference and bring smiles to those in need. Thank you for being a caring soul!
          </Typography>
        </Box>
        }
        {isFoodPicked &&
        <Box>
          <Typography variant="h3" sx={{marginBottom: "1rem"}}>🌟Your generosity is picked🌟</Typography>
          <Typography>
          Thank you for your generosity. Through your kind donation, you have not only filled empty stomachs but also touched countless lives. Your act of compassion has brought hope and relief to those who have been burdened by hunger.

          You havd earned 10 points with this donation 

          As you have total 50 points and will send you seeds to plant 
        </Typography>
        <Button variant="contained" sx={{backgroundColor:"#8a2b06", marginTop:"2rem"}} onClick={()=> navigate("/meals")}>Back to Meals</Button>
        </Box> }
    </ContainerBox>
  )
}

export default ThanksMessageScreen
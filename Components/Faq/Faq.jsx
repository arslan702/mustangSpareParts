import React from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import { Container } from "@mui/system";
import styles from "./faq.module.css";
import img from '../../Images/faq.jpg'
import Image from "next/image";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  

export default function Faq() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    return (
    <Grid>
      <Container>
        <Grid>
          <Typography variant="h4" align="center">
            <b>FAQ</b>{" "}
          </Typography>
        </Grid>
        <br/>
        <br/>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card className={styles.card}>
              <Image src={img} className={styles.img} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box className={styles.faq} >
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"className={styles.summary}>
          <Typography>1- What’s the difference between OEM & Aftermarket?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          OEM stands for Original Equipment Manufacturer. These parts are made by the original vehicle manufacturer and will perfectly fit into your vehicle.
          <br/>

Aftermarket auto parts are made by third-party manufacturers. These parts come in different qualities. Only some of them are verified suppliers, but they provide more customization.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"className={styles.summary}>
          <Typography>Is it recommended to buy used parts for the imported vehicles?2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We recommend buying used parts only if the condition of that part is good. We here at ABCAutoParts sell only the best quality parts.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className={styles.summary}>
          <Typography>3- How can I return a parcel if I mistakenly order an incorrect part for my vehicle ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The product must be undamaged and unused. The product should be returned within 2 days after delivery. Our team will analyze the product condition and if the product meets the “Return Terms & Conditions” then the payment will be transferred to the customer via account transfer. This whole process may take 5 to 8 working days.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header"className={styles.summary}>
          <Typography>4- How do you calculate the delivery charges?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Delivery charges completely depend upon the size and weight of the ordered product.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className={styles.summary}>
          <Typography>5- Do you deliver in every city of USA?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, we provide delivery services all over Pakistan. Our vision is to allow every person from rural and urban areas to find and buy the best parts for their vehicles
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
          </Grid>
        </Grid>
      </Container>
      <br/>
      <br/>
    </Grid>
  );
}

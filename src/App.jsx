import './App.css'
import { useState } from 'react'
import {
  StyledMainContainer,
  StyledPasswordContainer,
  StyledAppContainer,
  StyledFormContainer,
  StyledStrengthContainer,
  StyledDialogTitle} from "./StyledComponents/StyledComponents.jsx"
import collectionOfCharacters from "./collectionOfCharacters.js"
import Typography  from '@mui/material/Typography'
import Slider from "@mui/material/Slider"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox  from '@mui/material/Checkbox'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Collapse, Icon } from '@mui/material';
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material"
import {List,ListItem,ListItemText} from "@mui/material"
import {Divider} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {styled} from "@mui/system"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Box from "@mui/material/Box"



function App() {
  let [len,setLen] = useState(4)
  let [pass,setPass] = useState("P4$5W0rD!")
  let [arrayOfCheckboxes, setArrayOfCheckboxes] = useState([false,false,false,false]) // bro i was forced to do this without id if it doesnt work kill my dog and cdefgab
  let [listRecentPasswords,setListRecentPasswords] = useState([])
  let [open,setOpen] = useState(false)
  let [openAlertError,setOpenAlertError] = useState(false)
  let [passAmount,setPassAmount] = useState(0)
  

  function handleChange(event,newVal) {
    setLen(newVal)
  }
  console.log(len)

  function handleSubmit(e) {

    if (arrayOfCheckboxes.filter(val => val !== false).length === 0) {
      setOpenAlertError(true)
      return
    }
    setPassAmount(passAmount+1)
    setOpenAlertError(false)
    console.log("YE")
    let initialPass = ""
    let smth = arrayOfCheckboxes.slice()
    smth.forEach((value,index) => {
      if (value) {
        initialPass += collectionOfCharacters[index].characters[Math.floor(Math.random() * collectionOfCharacters[index].characters.length)]
      }
    })
    let initialPassLen = initialPass.length
    while (initialPass.length < len) {
      let randomIndex = Math.floor(Math.random() * (4))
      console.log(randomIndex)
      if (arrayOfCheckboxes[randomIndex]) {
        initialPass += collectionOfCharacters[randomIndex].characters[Math.floor(Math.random() * collectionOfCharacters[randomIndex].characters.length)]
      }
    }
    setPass(initialPass)
    if (listRecentPasswords.length < 10) {
      setListRecentPasswords(prev => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let copy = prev.slice()
        copy.push({pass:initialPass,date:hours+":"+minutes,id:passAmount})
        return copy
      })
    }
  }


  function updateArrayOfDogshit(e,arr,id) {
    let newArray = arr.slice()
    newArray[id] = !newArray[id]
    setArrayOfCheckboxes(newArray)
  }

  function changeArrayOfCheckboxes(id) {
    let copy = arrayOfCheckboxes.slice()
    let smth = copy.map((el,index) => {
      return index <= id
    })
    smth.sort(() => Math.random() - 0.5)
    setArrayOfCheckboxes(smth)
  }

  let amountOfTrue = arrayOfCheckboxes.filter(val => val === true)
  let levelOfSecurity;
  switch(amountOfTrue.length) {
    case 1:
      levelOfSecurity = "DOGSHIT"
      break;
    case 2:
      levelOfSecurity = "MEDIUM"
      break;
    case 3:
      levelOfSecurity = "ELITE";
      break;
    case 4:
      levelOfSecurity = "MAXIMUM";
      break;
  }

  console.log(levelOfSecurity)

  let securityStyle;
  let colorToFill;
  switch(levelOfSecurity) {
    case 'DOGSHIT':
      securityStyle = {color: "red"}
      colorToFill = "red"
      break;
    case 'MEDIUM':
      securityStyle = {color:"purple"}
      colorToFill = "purple"
      break;
    case 'ELITE':
      securityStyle = {color:"orange"}
      colorToFill = "orange"
      break;
    case 'MAXIMUM':
      securityStyle = {color:"green"}
      colorToFill = "green"
      break;
  }

  function ZeroSecurity() {
    let copySorted = arrayOfCheckboxes.slice().sort((a,b) => Number(b) - Number(a))
    return (
      <Stack direction={"row"} spacing={1}>
        <Typography sx={securityStyle}>{levelOfSecurity}</Typography>
        {<Box key={0}
          onClick={() => changeArrayOfCheckboxes(0)}
          fontSize='medium' 
          style={
            {backgroundColor:copySorted[0] ? colorToFill : "",
            width:"15px",
            border:"2px solid white"}}/>}
        {<Box key={1}
          onClick={() => changeArrayOfCheckboxes(1)}
          fontSize='medium' 
          style={
            {backgroundColor:copySorted[1] ? colorToFill : "",width:"15px",border:"2px solid white"}}/>}
        {<Box key={2}
          onClick={() => changeArrayOfCheckboxes(2)}
          fontSize='medium' 
          style={
            {backgroundColor:copySorted[2] ? colorToFill : "",width:"15px",border:"2px solid white"}}/>}
        {<Box key={3}
          onClick={() => changeArrayOfCheckboxes(3)}
          fontSize='medium' 
          style={
            {backgroundColor:copySorted[3] ? colorToFill : "",width:"15px",border:"2px solid white"}}/>}
      </Stack>
    )
  }

  function deletePass(objec) {
    setListRecentPasswords(prev => {
      let copy = prev.slice()
      copy= copy.filter(val => val.id !== objec.id)
      return copy
    })
  }

  let checkboxStyleDefault = {
    ' & .MuiSvgIcon-root': {
      border:"none",
      color:"white"
    },
    '&.Mui-checked .MuiSvgIcon-root': {
      color: 'white',
    },
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#81c784',
      },
      secondary: {
        main: '#757575',
      },
      third: {
        main:"white"
      },
    },
  });
  let recentPasswords;
  if (listRecentPasswords.length > 0) {
    recentPasswords = listRecentPasswords.map((obj,index) => {
      return (
        <div key={obj.id}>
        <Stack direction={"row"} alignItems={"center"}>
          Date: {obj.date}
          <ListItem>
            <ListItemText component='div'><ListItemText sx={{wordWrap: 'break-word',width:"200px"}}>{obj.pass}</ListItemText></ListItemText>
          </ListItem>
          <CopyToClipboard text={obj.pass}>
            <IconButton sx={{paddingRight:0}} fontSize='medium'>
              <ContentCopyIcon color="third" sx={{cursor:"pointer"}}/>
            </IconButton>
            </CopyToClipboard>
          <IconButton onClick={() => deletePass(obj)} sx={{paddingRight:0}} fontSize='medium'>
            <DeleteOutlineIcon color='third'></DeleteOutlineIcon>
          </IconButton>
        </Stack>
        <Divider variant="center" sx={{background:"#e0e0e0"}}/>
        </div>
      )
    })
  }
  else {recentPasswords = "There is no passwords..."}

  console.log(recentPasswords)
  return (
    <ThemeProvider theme={theme}>
      <StyledMainContainer>
        <Typography 
              name="title" 
              sx={{textAlign:"center",fontFamily:"JetBrains mono",color: "gray"}} 
              variant="h5">
                Password Generator
            </Typography>
        <StyledPasswordContainer>
          <Typography key={pass} sx={{fontFamily:"JetBrains mono",wordWrap: 'break-word',width:"350px"}}>{pass}</Typography>
          <CopyToClipboard text={pass}>
            <ContentCopyIcon sx={{cursor:"pointer"}}/>
          </CopyToClipboard>
        </StyledPasswordContainer>
        <StyledAppContainer>
          <StyledFormContainer>
              <Box
                name="char-len-container" 
                sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Typography sx={{fontFamily:"JetBrains mono"}}>Character Length</Typography>
                <Typography sx={{fontFamily:"JetBrains mono"}}>{len}</Typography>
              </Box>
              <Slider 
                value={len}
                sx={{marginLeft:"10px",width:"95%",color: "gray"}}
                step={1}
                min={4} 
                max={40}  
                aria-label="char-len"
                onChange={(e,value) => handleChange(e,value)} />
              <Box name="options-container">
                <FormGroup onSubmit={(e) => handleSubmit(e)}>
                  <FormControlLabel
                    control={<Checkbox onChange={(e) => updateArrayOfDogshit(e,arrayOfCheckboxes,0)}  checked={arrayOfCheckboxes[0]} sx={checkboxStyleDefault}/>} 
                    label={<Typography sx={{fontFamily:"JetBrains mono"}}>Include Uppercase Letters</Typography>}/>
                  <FormControlLabel 
                    control={<Checkbox onChange={(e) => updateArrayOfDogshit(e,arrayOfCheckboxes,1)}  checked={arrayOfCheckboxes[1]} sx={checkboxStyleDefault}/>} label={<Typography sx={{fontFamily:"JetBrains mono"}}>Include Lowercase Letters</Typography>}/>
                  <FormControlLabel 
                    control={<Checkbox checked={arrayOfCheckboxes[2]} onChange={(e) => updateArrayOfDogshit(e,arrayOfCheckboxes,2)} 
                    sx={checkboxStyleDefault}/>} 
                    label={<Typography sx={{fontFamily:"JetBrains mono"}}>Include Numbers</Typography>}/>
                  <FormControlLabel 
                    control={<Checkbox onChange={(e) => updateArrayOfDogshit(e,arrayOfCheckboxes,3)}  checked={arrayOfCheckboxes[3]} sx={checkboxStyleDefault}/>} 
                    label={<Typography sx={{fontFamily:"JetBrains mono"}}>Include Symbols</Typography>}/>
                </FormGroup>
                <Collapse in={openAlertError}>
                  <Alert sx={{color:"white",marginTop:"10px",marginBottom:"10px"}} variant='outlined' severity="error">
                    <AlertTitle>Error</AlertTitle>          
                      Please select <strong>at least 1 option!</strong>
                  </Alert>
                </Collapse>
              </Box>
              <StyledStrengthContainer>
                <Typography sx={{fontFamily:"JetBrains mono",color:"gray"}}>Security</Typography>
                <ZeroSecurity/>
              </StyledStrengthContainer>
              <Button color="primary" sx={{width:"100%",fontFamily:"JetBrains mono"}} variant="contained" onClick={(e) => handleSubmit(e)}>GENERATE</Button>
              <Button color="secondary" onClick={() => setOpen(true)}>Open recent Passwords</Button>
              <Dialog
                minWidth="450"
                maxWidth="450"
                sx={{display:"absolute",top:"170px",maxHeight:"400px"}}
                spacing={5}
                open={open}
                onClose={() => setOpen(false)}
                
                >
                <StyledDialogTitle >
                  Recent Passwords
                  <Typography fontFamily={"JetBrains mono"} color="#666c75" fontSize={"14px"}>Maximum 10 passwords</Typography>
                  <IconButton 
                  aria-label='close'
                  onClick={() => setOpen(false)}
                  sx ={{
                    position:"absolute",
                    top:"6px",
                    right:"2px"
                  }}>
                  <CloseIcon sx={{float:"right",color:"white"}}/>
                  </IconButton>
                </StyledDialogTitle>
                <DialogContent >
                
                <Collapse in={listRecentPasswords.length >= 10 === true}>
                  <Alert sx={{color:"white",marginTop:"10px",marginBottom:"10px"}} variant='outlined' severity="warning">
                    <AlertTitle>Warning</AlertTitle>          
                      The limit of <strong>10 passwords</strong> has been reached. Try to delete old passwords.
                  </Alert>
                </Collapse>
                    <List sx={{color:"white"}}>
                      {recentPasswords}
                    </List>
                </DialogContent>
              </Dialog>
          </StyledFormContainer>
        </StyledAppContainer>
      </StyledMainContainer>
    </ThemeProvider>
  )
}

export default App


import {
  DialogTitle,
} from "@mui/material"
import {styled} from "@mui/system"
import Box from "@mui/material/Box"


export const StyledMainContainer = styled(Box)({
    width:"100vw",
    height:"100vh",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    color:"white",
    backgroundImage: "linear-gradient(to top, #010000, #090103, #0e0109, #0e0411, #0a0718)"
  })

export  const StyledPasswordContainer = styled(Box)({
    fontFamily:"JetBrains mono",
    padding:"10px",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    background:"#292b33",
    marginTop:"10px",
    width:"400px",
  })

export  const StyledAppContainer = styled(Box)({
    width: "400px",
    height:"fit-content",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    marginTop:"20px",
    background:"#292b33",
    padding:"10px",
  })

export const StyledFormContainer = styled(Box)({

  })

export const StyledStrengthContainer = styled(Box)({
    padding:"15px",
    marginBottom:"20px",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    background:"#1c1e24",
  })

export const StyledDialogTitle = styled(DialogTitle)({
    fontFamily:"JetBrains mono",
    padding:"20px 70px 10px 20px",
    color:"white"
  })

import React from "react";
// import ProfileLink from "../ProfileLink/ProfileLink";
// import { UserContext } from "../../utils/UserContext";
import { makeStyles, Box, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontFamily: 'Montserrat'
  }
}));

const User = () => {
//   const { userData } = useContext(UserContext);
  const classes = useStyles();
  return (
    <>
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        p={2.3}
        mx="auto"
      >
      <Typography className={classes.title} variant="h5">{`firstName lastName`}</Typography>
      </Box>
      <Divider variant="middle" />
      {/* <ProfileLink link="Inventory" />
      <ProfileLink link="Excursions" /> */}
    </>
  );
};

export default User;
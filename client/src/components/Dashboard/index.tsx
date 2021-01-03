import React, { useContext } from 'react';
// import ProfileLink from "../ProfileLink/ProfileLink";
import { UserContext } from '../../context/UserContext';
import { makeStyles, Box, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    fontFamily: 'Montserrat',
  },
}));

const Dashboard: React.FC = (): JSX.Element => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  return (
    <>
      <Box
        alignItems='center'
        justifyContent='center'
        display='flex'
        p={2.3}
        mx='auto'
      >
        <Typography
          className={classes.title}
          variant='h5'
        >{user && `${user.firstName} ${user.lastName}`}</Typography>
      </Box>
      <Divider variant='middle' />
      {/* <ProfileLink link="Inventory" />
      <ProfileLink link="Excursions" /> */}
    </>
  );
};

export default Dashboard;

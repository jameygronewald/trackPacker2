import React, { useEffect, useState, useContext } from 'react';
import { excursionRequests } from '../../utils/API/excursionRequests';
import { useParams } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
// import ExcursionInventoryListAdd from '../../components/ExcursionInventoryListAdd/ExcursionInventoryListAdd';
// import ExcursionInventoryList from '../../components/ExcursionInventoryList/ExcursionInventoryList';
// import ExcursionInventoryWishList from '../../components/ExcursionInventoryWishList/ExcursionInventoryWishList';
import { UserContext } from '../../context/UserContext';

import { Typography, Grid, Box, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    /*  flexGrow: 1, */
    fontFamily: 'Montserrat',
    /* textAlign: "center", */
  },
  list: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const Excursion: React.FC = (): JSX.Element => {
  const classes = useStyles();

  const [currentExcursion, setCurrentExcursion] = useState({});

  const { user, setUserState } = useContext(UserContext);
  const { id: excursionId } = useParams<any>();

//   useEffect(() => {
//     API.getExcursion(id, authConfig(localStorage.getItem('sessionToken')))
//       .then(response => {
//         const excursionState = response.data.data;
//         setCurrentExcursion(excursionState);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, [id]);

//   const addToExcursion = id => {
//     let currentExcursionData = userData.excursions.reduce(
//       (excursionObject, excursion) =>
//         excursion._id === excursionId
//           ? (excursionObject = { ...excursion })
//           : excursionObject,
//       {}
//     );
//     currentExcursionData.items.push(id);
//     const itemObj = { items: currentExcursionData.items };
//     API.updateExcursionInventory(
//       currentExcursionData._id,
//       itemObj,
//       authConfig(userToken)
//     )
//       .then(response => {
//         setCurrentExcursion(response.data.data);
//         currentExcursionData = response.data.data;
//         setUserData({ ...userData, isAuthenticated: true });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={2}>
          <Dashboard />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Box display='flex' p={0.8} mx='auto'>
            <Typography className={classes.title} variant='h3'>
              {/* {currentExcursion.name} */}
            </Typography>
          </Box>
          <Divider variant='middle' />
          <Grid container spacing={1}>
            <Grid className={classes.list} item xs={12} sm={6}>
              <Typography className={classes.title} variant='h5'>
                Inventory
              </Typography>
              <Divider className={classes.list} variant='middle' />

              {/* <ExcursionInventoryListAdd
                addToExcursion={addToExcursion}
              ></ExcursionInventoryListAdd> */}
            </Grid>
            <Grid className={classes.list} item xs={12} sm={6}>
              <Typography className={classes.title} variant='h5'>
                {/* Inventory for {currentExcursion.name} */}
              </Typography>
              <Divider className={classes.list} variant='middle' />
              {/* {currentExcursion.items &&
                currentExcursion.items
                  .filter(item => item.status === 'Inventory')
                  .map((item, index) => (
                    <ExcursionInventoryList
                      key={index}
                      itemName={item.name}
                      itemId={item._id}
                    ></ExcursionInventoryList>
                  ))} */}

              <Typography className={classes.title} variant='h5'>
                {/* Wishlist for {currentExcursion.name} */}
              </Typography>
              <Divider className={classes.list} variant='middle' />
              {/* {currentExcursion.items &&
                currentExcursion.items
                  .filter(item => item.status === 'Wishlist')
                  .map((item, index) => (
                    <ExcursionInventoryWishList
                      key={index}
                      itemName={item.name}
                      itemId={item._id}
                    ></ExcursionInventoryWishList>
                  ))} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Excursion;

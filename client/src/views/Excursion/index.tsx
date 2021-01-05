import React, { useContext } from 'react';
import { excursionRequests } from '../../utils/API/excursionRequests';
import { useParams } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import AddToExcursionList from './AddToExcursionList';
import ExcursionInventoryList from './ExcursionInventoryList';
import { UserContext } from '../../context/UserContext';
import { IExcursion } from '../Excursions/interfaces';
import { ExcursionQueryParams } from './interfaces';
import { InventoryItem } from '../Inventory/interfaces';

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

  const { user, setUserState } = useContext(UserContext);
  const { id: excursionId } = useParams<ExcursionQueryParams>();

  let currentExcursion: IExcursion | null = null;
  if (user)
    [currentExcursion] = user.excursions.filter(
      (excursion: IExcursion) => excursion._id === excursionId
    );

  const addItemToExcursion = async (id: string, item: InventoryItem) => {
    try {
      const response = await excursionRequests.addItemToExcursion(id, item);
      setUserState({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      console.log(error);
    }
  };

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
              {user && currentExcursion !== null && currentExcursion.name}
            </Typography>
          </Box>
          <Divider variant='middle' />
          <Grid container spacing={1}>
            <Grid className={classes.list} item xs={12} sm={6}>
              <Typography className={classes.title} variant='h5'>
                Inventory
              </Typography>
              <Divider className={classes.list} variant='middle' />
              <AddToExcursionList
                excursionId={excursionId}
                addItemToExcursion={addItemToExcursion}
              ></AddToExcursionList>
            </Grid>
            <Grid className={classes.list} item xs={12} sm={6}>
              <Typography className={classes.title} variant='h5'>
                Inventory for{' '}
                {user && currentExcursion !== null && currentExcursion.name}
              </Typography>
              <Divider className={classes.list} variant='middle' />
              {currentExcursion &&
                currentExcursion.items &&
                currentExcursion.items
                  .filter((item: InventoryItem) => item.status === 'Inventory')
                  .map((item: InventoryItem, index: number) => (
                    <ExcursionInventoryList
                      key={index}
                      item={item}
                    ></ExcursionInventoryList>
                  ))}
              <Typography className={classes.title} variant='h5'>
                Wishlist for{' '}
                {user && currentExcursion !== null && currentExcursion.name}
              </Typography>
              <Divider className={classes.list} variant='middle' />
              {currentExcursion &&
                currentExcursion.items &&
                currentExcursion.items
                  .filter((item: InventoryItem) => item.status === 'Wishlist')
                  .map((item: InventoryItem, index: number) => (
                    <ExcursionInventoryList
                      key={index}
                      item={item}
                    ></ExcursionInventoryList>
                  ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Excursion;

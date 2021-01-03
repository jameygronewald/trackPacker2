import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import {
  makeStyles,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const InventoryList = (props: any) => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant='h6' className={classes.title}>
            Inventory
          </Typography>
          <div className={classes.demo}>
            <List>
              {user && user.items && user.items.length > 0 ? (
                user.items
                  .filter((item: any) => item.status === 'Inventory')
                  .map((item: any) => (
                    <div key={item._id}>
                      <ListItem>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge='end'
                            aria-label='update'
                            // onClick={() => {
                            //   props.updateItem(item);
                            // }}
                          >
                            <FavoriteBorderIcon
                              style={{
                                color: '#832d33',
                                borderColor: '#13160e',
                              }}
                            />
                          </IconButton>
                          <IconButton
                            edge='end'
                            aria-label='delete'
                            // onClick={() => {
                            //   props.deleteItem(item._id);
                            // }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </div>
                  ))
              ) : (
                <Typography>No items currently stored in Inventory.</Typography>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={5}>
          <Typography variant='h6' className={classes.title}>
            Wishlist
          </Typography>
          <div className={classes.demo}>
            <List>
              {user && user.items && user.items.length > 0 ? (
                user.items
                  .filter((item: any) => item.status === 'Wishlist')
                  .map((item: any) => (
                    <div key={item._id}>
                      <ListItem>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge='end'
                            aria-label='update'
                            // onClick={() => {
                            //   props.updateItem(item);
                            // }}
                          >
                            <FavoriteIcon
                              style={{
                                color: '#832d33',
                                borderColor: '#13160e',
                              }}
                            />
                          </IconButton>
                          <IconButton
                            edge='end'
                            aria-label='delete'
                            // onClick={() => {
                            //   props.deleteItem(item._id);
                            // }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </div>
                  ))
              ) : (
                <Typography>No items currently stored in Wishlist.</Typography>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InventoryList;

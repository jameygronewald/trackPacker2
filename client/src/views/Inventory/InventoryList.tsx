import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { InventoryItem, InventoryListProps } from './interfaces';

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
import './Inventory.css';

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

const InventoryList: React.FC<InventoryListProps> = (
  props: InventoryListProps
): JSX.Element => {
  const classes = useStyles();

  const { updateItem, deleteItem } = props;

  const { user } = useContext(UserContext);

  let inventoryItems: InventoryItem[] | null = null;
  if (user)
    inventoryItems = user.items.filter(
      (item: InventoryItem) => item.status === 'Inventory'
    );

  let wishlistItems: InventoryItem[] | null = null;
  if (user)
    wishlistItems = user.items.filter(
      (item: InventoryItem) => item.status === 'Wishlist'
    );

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography
            variant='h6'
            className={`inventoryListTitle ${classes.title}`}
          >
            Inventory
          </Typography>
          <div className={classes.demo}>
            <List>
              {user && inventoryItems !== null && inventoryItems.length > 0 ? (
                inventoryItems.map((item: InventoryItem) => (
                  <div key={item._id}>
                    <ListItem>
                      <ListItemText primary={item.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge='end'
                          aria-label='update'
                          onClick={() => updateItem(item._id)}
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
                          onClick={() => deleteItem(item._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                ))
              ) : (
                <Typography className='emptyMessage'>
                  Add items to your inventory!
                </Typography>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={5}>
          <Typography
            variant='h6'
            className={`inventoryListTitle ${classes.title}`}
          >
            Wishlist
          </Typography>
          <div className={classes.demo}>
            <List>
              {user && wishlistItems !== null && wishlistItems.length > 0 ? (
                wishlistItems.map((item: InventoryItem) => (
                  <div key={item._id}>
                    <ListItem>
                      <ListItemText primary={item.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge='end'
                          aria-label='update'
                          onClick={() => updateItem(item._id)}
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
                          onClick={() => deleteItem(item._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                ))
              ) : (
                <Typography>Add items to your wishlist!</Typography>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InventoryList;

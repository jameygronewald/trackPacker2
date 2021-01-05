import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { InventoryItem } from '../Inventory/interfaces';
import { AddToExcursionListProps } from './interfaces';

import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Grid,
  Slide,
  makeStyles,
} from '@material-ui/core';
import './Excursion.css';

const useStyles = makeStyles(theme => ({
  root: {
    /* flexGrow: 1, */
    width: '100%',
    /* maxWidth: 752, */
  },
  demo: {
    backgroundColor: 'whitesmoke',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const AddToExcursionList: React.FC<AddToExcursionListProps> = (
  props: AddToExcursionListProps
): JSX.Element => {
  const classes = useStyles();

  const { excursionId, addItemToExcursion } = props;

  const { user } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className={classes.demo}>
            <List>
              {user && user.items.length > 0 ? (
                user.items.map((item: InventoryItem) => (
                  <div key={item._id}>
                    <Slide
                      direction='down'
                      in={true}
                      mountOnEnter
                      unmountOnExit
                    >
                      <ListItem>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction className='excursionIconsContainer'>
                          {item.status === 'Wishlist' && (
                            <FavoriteIcon className='excursionHeart'></FavoriteIcon>
                          )}
                          <IconButton
                            edge='end'
                            aria-label='add'
                            onClick={() => {
                              addItemToExcursion(excursionId, item);
                            }}
                          >
                            <AddBoxIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Slide>
                  </div>
                ))
              ) : (
                <Typography>Your inventory is empty!</Typography>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddToExcursionList;

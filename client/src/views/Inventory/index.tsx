import React, { useState, useRef, useContext } from 'react';
import Dashboard from '../../components/Dashboard';
import InventoryList from './InventoryList';
import { itemRequests } from '../../utils/API/itemRequests';
import { InventoryItem } from './interfaces';
import { UserContext } from '../../context/UserContext';
import {
  makeStyles,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

interface Props {}

const Inventory = (props: Props) => {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const [newItem, setNewItem] = useState<InventoryItem>({
    name: '',
    status: 'Inventory',
  });

  const { setUserState, userState } = useContext(UserContext);

  const textInput = useRef<any>(null);

  // ADD ITEM TO INVENTORY
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await itemRequests.addItemToInventory(newItem);
      setUserState({ ...userState, user: response.data });
      setNewItem({ ...newItem, name: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (itemId: string) => {
    try {
      const response = await itemRequests.updateItemStatus(itemId);
      setUserState({ ...userState, user: response.data.user });
    } catch (error) {
      console.log(error);
    }
  };

  //   const deleteItem = id => {
  //     API.deleteItem(id, authConfig(userToken))
  //       .then(response => {
  //         setUserData({ ...response.data.data, isAuthenticated: true });
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
        <Grid item xs={12} sm={5}>
          <Box
            style={{
              marginTop: '10px',
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                boxShadow: '10px 10px 5px grey',
                borderStyle: 'solid',
                borderColor: '#13160e',
              }}
            >
              <TextField
                id='standard-basic'
                label='Add New Item'
                name='newItem'
                // ref='textEl'
                inputRef={textInput}
                type='text'
                placeholder='Add an Item'
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                style={{ color: '#13160e', borderColor: '#13160e' }}
              />
              <Button
                onClick={() => {
                  setTimeout(() => {
                    textInput.current.value = '';
                  }, 100);
                }}
                type='submit'
                variant='outlined'
                size='large'
                color='default'
                style={{ color: '#13160e', borderColor: '#13160e' }}
                className={classes.margin}
              >
                Add to Inventory
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name='wishlist'
                    id='wishlist'
                    style={{ color: '#832d33', borderColor: '#13160e' }}
                    onChange={e => {
                      e.target.checked
                        ? setNewItem({ ...newItem, status: 'Wishlist' })
                        : setNewItem({ ...newItem, status: 'Inventory' });
                    }}
                  />
                }
                label='Add to Wishlist'
              />
            </form>
            <InventoryList updateItem={updateItem} /* deleteItem={deleteItem} */
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Inventory;

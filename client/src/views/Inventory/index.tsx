import React from 'react';
import Dashboard from '../../components/Dashboard';
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
// import InventoryList from "../../components/InventoryList/InventoryList";

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

  // const [newItem, setNewItem] = useState({
  //   name: '',
  //   status: 'Inventory',
  // });

  //   let textInput = useRef(null);

  //   const handleChange = ({ target: { value } }) => {
  //     setNewItem({ ...newItem, name: value });
  //   };
  //   // ADD ITEM TO INVENTORY
  //   const handleSubmit = event => {
  //     event.preventDefault();
  //     API.addItem(newItem, authConfig(userToken))
  //       .then(response => {
  //         setUserData({ ...response.data.data, isAuthenticated: true });
  //         setNewItem({ ...newItem, name: '' });
  //       })
  //       .catch(err => console.log(err));
  //   };

  //   const toggleChecked = e => {
  //     e.target.checked
  //       ? setNewItem({ ...newItem, status: 'Wishlist' })
  //       : setNewItem({ ...newItem, status: 'Inventory' });
  //   };

  //   const updateItem = item => {
  //     item.status === 'Wishlist'
  //       ? (item.status = 'Inventory')
  //       : (item.status = 'Wishlist');
  //     API.updateItem(item, authConfig(userToken))
  //       .then(response => {
  //         setUserData({ ...userData, isAuthenticated: true });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

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
            //   align='center'
            //   onSubmit={handleSubmit}
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
                // refs='textEl'
                // inputRef={textInput}
                type='text'
                placeholder='Add an Item'
                // onChange={handleChange}
                style={{ color: '#13160e', borderColor: '#13160e' }}
              />
              <Button
                // onClick={() => {
                //   setTimeout(() => {
                //     textInput.current.value = '';
                //   }, 100);
                // }}
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
                    // onChange={toggleChecked}
                  />
                }
                label='Add to Wishlist'
              />
            </form>
            {/* <InventoryList updateItem={updateItem} deleteItem={deleteItem} /> */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Inventory;

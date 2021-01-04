import React, { useState, useContext, useRef } from 'react';
// import ExcursionCard from '../../components/ExcursionCard/ExcursionCard';
import Dashboard from '../../components/Dashboard';
import { UserContext } from '../../context/UserContext';

import { TextField, Grid, Button, Box, Divider } from '@material-ui/core';

const Excursions: React.FC = (): JSX.Element => {
  const [newExcursion, setNewExcursion] = useState<string>('');

  const { user, setUserState } = useContext(UserContext);

  const textInput = useRef<any>(null);

    const handleSubmit = (e: any) => {
      e.preventDefault();
  //     const excursionObj = { name: newExcursion };
  //     API.addExcursion(excursionObj, authConfig(userToken))
  //       .then(response => {
  //         setUserData({ ...response.data.data, isAuthenticated: true });
  //         setNewExcursion({ name: '' });
  //       })
  //       .catch(err => console.log(err));
    };

  //   const deleteExcursion = id => {
  //     API.deleteExcursion(id, authConfig(userToken))
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
        <Grid item xs={12} sm={9}>
          <Box
            alignItems='right'
            justifyContent='right'
            display='flex'
            p={2}
            mx='auto'
          >
            <form onSubmit={handleSubmit}>
              <TextField
                size='small'
                name='newExcursion'
                inputRef={textInput}
                placeholder='Add an Excursion'
                onChange={e => setNewExcursion(e.target.value)}
              ></TextField>
              <Button
                type='submit'
                onClick={() => {
                  setTimeout(() => {
                    textInput.current.value = '';
                  }, 300);
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
          <Divider variant='middle' />
          {user.excursions &&
            user.excursions.map((excursion:any) => (
              <Grid item xs={12} sm={12} key={excursion._id}>
                <Box display='flex' p={1} mx='auto'>
                  {/* <ExcursionCard
                    randomImg='https://source.unsplash.com/1600x900/?nature,Utah'
                    excursionId={excursion._id}
                    excursionName={excursion.name}
                    deleteExcursion={deleteExcursion}
                  /> */}
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Excursions;

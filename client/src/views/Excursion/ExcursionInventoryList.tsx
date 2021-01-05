import React from 'react';
import { ExcursionInventoryListProps } from './interfaces';

import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Grid,
  Slide,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 0),
  },
}));

const ExcursionInventoryList: React.FC<ExcursionInventoryListProps> = (props: ExcursionInventoryListProps): JSX.Element => {
  const classes = useStyles();

  const { excursionId, item, deleteItemFromExcursion } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <div className={classes.demo}>
            <List style={{ opacity: '0.8' }}>
              <Slide direction='left' in={true} mountOnEnter unmountOnExit>
                <ListItem>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                        onClick={() => {
                          deleteItemFromExcursion(excursionId, item);
                        }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Slide>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExcursionInventoryList;

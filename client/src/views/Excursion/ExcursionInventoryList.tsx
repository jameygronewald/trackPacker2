import React from 'react';
import { ExcursionInventoryListProps } from './interfaces';

import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Slide,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ExcursionInventoryList: React.FC<ExcursionInventoryListProps> = (
  props: ExcursionInventoryListProps
): JSX.Element => {
  const { excursionId, item, deleteItemFromExcursion } = props;

  return (
    <>
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
    </>
  );
};

export default ExcursionInventoryList;

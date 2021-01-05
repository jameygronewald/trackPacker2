import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ExcursionCardProps } from './interfaces';

import {
  CardContent,
  Card,
  Typography,
  Button,
  CardActions,
  Divider,
  Grow,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    /* margin: 'auto' */
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Montserrat',
    /* textAlign: "center", */
    /* color: 'whitesmoke'  */
  },
  button: {
    justifyContent: 'center',
  },
  media: {
    /*   backgroundImage: `url(${"https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"})`, 
     backgroundRepeat: "no-repeat", 
    objectFit: 'cover',  */
  },
}));
const ExcursionCard: React.FC<ExcursionCardProps> = (
  props: ExcursionCardProps
): JSX.Element => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  const { excursionId, excursionName, deleteExcursion } = props;

  return (
    <>
      <Grow in={true}>
        <Card
          style={{ opacity: '0.8', boxShadow: '10px 10px 5px grey' }}
          className={`${classes.root} ${classes.media}`}
          variant='outlined'
        >
          <CardContent>
            <Typography
              className={classes.title}
              variant='h3'
              color='textSecondary'
            >
              {user.firstName}'s {excursionName} Excursion
            </Typography>
            <Divider className={classes.title} variant='middle' />
          </CardContent>
          <CardActions>
            <Link to={`/excursions/${excursionId}`}>
              <Button /* className={classes.title} */>View </Button>
            </Link>
            <Button
              /* className={classes.title} */
              onClick={() => {
                deleteExcursion(excursionId);
              }}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      </Grow>
    </>
  );
};

export default ExcursionCard;

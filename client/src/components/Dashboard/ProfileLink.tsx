import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import { ProfileLinkProps } from './interfaces';

import './Dashboard.css';

const ProfileLink: React.FC<ProfileLinkProps> = (props: ProfileLinkProps): JSX.Element => {
  return (
    <Box
      alignItems='center'
      justifyContent="center"
      display='flex'
      p={1}
      mx='auto'
    >
      <Link className='profileLink' to={`/${props.link}`}>
        <Button>{props.link}</Button>
      </Link>
    </Box>
  );
};

export default ProfileLink;

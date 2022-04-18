import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { auth } from 'fBase';
import { signOut } from 'firebase/auth';

function Profile() {
  const history = useHistory();
  const onLogoutClick = async () => {
    await signOut(auth);
    history.push('/home');
  };
  return (
    <Container>
      <button onClick={onLogoutClick}>Log Out</button>
    </Container>
  );
}

const Container = styled.div``;

export default Profile;

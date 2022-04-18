import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from 'fBase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import Nweet from '../components/Nweet';

function Home({ userObj }) {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, 'nweets'), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'nweets'), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet('');
  };

  const onChange = useCallback((e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  }, []);

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder="What's on your mind?"
          value={nweet}
          onChange={onChange}
          maxLength={120}
        />
        <input type='submit' value='Nweet' />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div``;

export default Home;

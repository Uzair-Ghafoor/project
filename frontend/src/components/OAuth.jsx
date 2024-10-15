import React from 'react';
import { app } from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../features/userSlice';
const OAuth = () => {
  const disptach = useDispatch();
  const handleGoogleAuth = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const name = result.user.displayName;
      const email = result.user.email;
      const photourl = result.user.photoURL;
      const result1 = await axios.post('/api/v1/user/google', {
        username: name,
        email,
        avatar: photourl,
      });
      disptach(signInSuccess(result1.data));
      console.log(result1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className=' bg-red-700 text-white w-full p-3 my-3 rounded-lg'
      onClick={handleGoogleAuth}
    >
      OAuth
    </button>
  );
};

export default OAuth;

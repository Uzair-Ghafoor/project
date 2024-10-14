import React from 'react';
import { app } from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const OAuth = () => {
  const handleGoogleAuth = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
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

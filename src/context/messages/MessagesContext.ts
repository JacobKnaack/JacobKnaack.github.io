import { createContext } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export type UserProfile = {
  email: string;
}

export type Message = {
  user: string;
  text: string;
}

export const loadUser = (): UserProfile => {
  const userString = localStorage.getItem('user_profile');
  if (userString) {
    const userJSON = JSON.parse(userString);
    return userJSON;
  } else {
    return { email: "" };
  }
}

export const saveUser = (userProfile: UserProfile): void => {
  const json = JSON.stringify(userProfile);
  localStorage.setItem('use_profile', json);
}

export const sendMessage = async ({ user, text }: Message) => {
  try {
    const response = await fetch(API_URL + '/message', {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user, text }),
    });
    console.log('REQUEST SUCCESS!', response.status);
  } catch (e) {
    console.log("REQUEST FAILED", e);
  }
}


export const MessageContext = createContext({ email: '' });

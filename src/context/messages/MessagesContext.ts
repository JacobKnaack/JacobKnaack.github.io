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

export interface MessageContextType {
  profile: UserProfile | null;
  hasSubmitted: boolean;
  handleProfile: (email: string) => void;
  handleMessageSubmit: (message: string) => Promise<void>;
  loadUser: () => void;
}

export const loadUser = (): UserProfile => {
  try {
    const userString = localStorage.getItem('user_profile');
    if (userString) {
      const userJSON = JSON.parse(userString);
      return userJSON;
    } else {
      return { email: "" };
    }
  } catch (e) {
    console.error('load user error', e);
    throw new Error('LOAD USER ERROR: unable to load user profile');
  }
}

export const saveUser = (userProfile: UserProfile): UserProfile => {
  try {
    const json = JSON.stringify(userProfile);
    localStorage.setItem('user_profile', json);
    return userProfile;
  } catch (e) {
    console.error('save user error', e);
    throw new Error('Unable to save user Profile');
  }
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
    return { status: response.status, message: 'OKAY' };
  } catch (e: unknown) {
    console.error(e);
    throw new Error('SEND MESSAGE ERROR:Unable to send message to message service');
  }
}


export const MessageContext = createContext<MessageContextType>({
  loadUser: () => {},
  profile: { email: '' },
  hasSubmitted: false,
  handleProfile: () => false,
  handleMessageSubmit: async () => {}
});

import { createContext } from 'react';
import { MessageContextType } from './MessagesProvider';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export type UserProfile = {
  email: string;
  hasSubmitted: boolean;
  submittedAt: number | null;
}

export type ProfileAction =
  | { type: 'REGISTER'; payload: { email: string } }
  | { type: 'SUBMIT' , payload: { timestamp: number | null }}
  | { type: 'RESET_SUBMIT' }

export type Message = {
  email: string;
  text: string;
}

export const profileReducer = (state: UserProfile, action: ProfileAction): UserProfile => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        email: action.payload.email,
      };
    case 'SUBMIT':
      return {
        ...state,
        hasSubmitted: true,
        submittedAt: action.payload.timestamp
      };
    case 'RESET_SUBMIT':
      return {
        ...state,
        hasSubmitted: false,
        submittedAt: null,
       }
    default:
      return state;
  }
};
export const generateTimeStamp = (): number => {
  return Date.now();
}
export const validateTimeStamp = (timeValue: number | null | undefined): boolean => {
  if (!timeValue) {
    return true;
  }
  const waitPeriod: number = 24 * 60 * 60 * 1000;
  const currentTime = generateTimeStamp();

  return Boolean(currentTime - timeValue >= waitPeriod);
}

export const loadUser = (): UserProfile => {
  try {
    const userString = localStorage.getItem('user_profile');
    if (userString) {
      const userJSON = JSON.parse(userString);
      return userJSON;
    } else {
      return { "email": "", "hasSubmitted": false, "submittedAt": null };
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

export const sendMessage = async ({ email, text }: Message): Promise<{status: number, timestamp: number}> => {
  try {
    const timestamp = generateTimeStamp();
    const response = await fetch(API_URL + '/message', {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, message: text, timestamp }),
    });
    return { status: response.status, timestamp };
  } catch (e: unknown) {
    console.error(e);
    throw new Error('SEND MESSAGE ERROR:Unable to send message to message service');
  }
}


export const MessageContext = createContext<MessageContextType>({
  loadUser: () => {},
  profile: { email: '', hasSubmitted: false, submittedAt: null },
  handleRegister: () => false,
  handleMessageSubmit: async () => {},
  awaitingResponse: false,
});

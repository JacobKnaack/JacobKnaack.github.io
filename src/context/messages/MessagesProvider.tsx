import React, { useEffect, useState, useCallback, useReducer} from 'react';
import {
  validateTimeStamp,
  profileReducer,
  MessageContext,
  UserProfile,
  loadUser,
  saveUser,
  sendMessage
} from "./MessagesContext";

export interface MessageContextType {
  profile: UserProfile;
  awaitingResponse: boolean;
  handleRegister: (email: string) => void;
  handleMessageSubmit: (message: string) => Promise<void>;
  loadUser: () => void;
}

export default function MessagesProvider({ children }: React.PropsWithChildren) {

  const userProfile = loadUser();
  const [profile, dispatch] = useReducer(profileReducer, userProfile);
  const [awaitingResponse, setAwaitingResponse] = useState(false);

  const handleRegister = useCallback((
    email: string,
    ): void => {
    const profileData = {
      ...profile,
      email,
    };
    if (validateTimeStamp(profile?.submittedAt)) {
      profileData.hasSubmitted = false;
    }
    const savedProfile: UserProfile = saveUser(profileData);
    dispatch({ type: 'REGISTER', payload: { email: savedProfile.email }});
  }, [profile]);

  const handleMessageSubmit = useCallback(async (message: string): Promise<void> => {
    if (profile) {
      try {
        setAwaitingResponse(true);
        const response = await sendMessage({ email: profile.email, text: message });
        if (response.status === 200) {
          dispatch({ type: 'SUBMIT', payload: { timestamp: response.timestamp }});
        }
      } catch(e) {
        dispatch({ type: 'RESET_SUBMIT' });
        throw new Error('Message Provider send message error');
      } finally {
        setAwaitingResponse(false);
      }
    } else {
      throw new Error('Unable to send Message, no profile loaded');
    }
  }, [profile, dispatch, setAwaitingResponse]);

  useEffect(() => {
    saveUser(profile);
  }, [profile]);

  useEffect(() => {
    if (userProfile) {
      handleRegister(userProfile.email);
      if (validateTimeStamp(userProfile.submittedAt) && profile.hasSubmitted === true) {
        dispatch({ type: 'RESET_SUBMIT' });
      }
    }
  }, []);

  return (
    <MessageContext.Provider value={{ profile, awaitingResponse, handleRegister, handleMessageSubmit, loadUser }}>
      {children}
    </MessageContext.Provider>
  )
}
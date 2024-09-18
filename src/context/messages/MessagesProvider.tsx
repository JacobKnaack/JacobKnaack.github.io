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
      setAwaitingResponse(true);
      const response = await sendMessage({ email: profile.email, text: message });
      if (response.status === 200) {
        dispatch({ type: 'SUBMIT', payload: { timestamp: response.timestamp }});
        saveUser({...profile, hasSubmitted: true, submittedAt: response.timestamp});
      }
    } else {
      dispatch({ type: 'RESET_SUBMIT' });
    }
    setAwaitingResponse(false);
  }, [profile, dispatch, setAwaitingResponse]);

  useEffect(() => {
    if (userProfile) {
      handleRegister(userProfile.email);
      if (validateTimeStamp(userProfile.submittedAt) && profile.hasSubmitted === true) {
        dispatch({ type: 'RESET_SUBMIT' });
        saveUser({ ...userProfile, hasSubmitted: false, submittedAt: null });
      }
    }
  }, []);

  return (
    <MessageContext.Provider value={{ profile, awaitingResponse, handleRegister, handleMessageSubmit, loadUser }}>
      {children}
    </MessageContext.Provider>
  )
}
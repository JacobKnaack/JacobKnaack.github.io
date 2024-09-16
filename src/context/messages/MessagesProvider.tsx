import React, { useEffect, useState } from 'react';
import {
  MessageContext,
  UserProfile,
  loadUser,
  saveUser,
  sendMessage
} from "./MessagesContext";

export default function MessagesProvider({ children }: React.PropsWithChildren) {

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleProfile = (email: string): void => {
    const profile: UserProfile = saveUser({ email });
    setProfile(profile);
  }

  const handleMessageSubmit = async (message: string): Promise<void> => {
    if (profile) {
      const response = await sendMessage({ user: profile.email, text: message });
      if (response.status === 200) {
        setHasSubmitted(true);
      }
    } else {
      setHasSubmitted(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <MessageContext.Provider value={{ profile, hasSubmitted, handleProfile, handleMessageSubmit, loadUser }}>
      {children}
    </MessageContext.Provider>
  )
}
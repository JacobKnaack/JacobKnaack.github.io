import React, { useEffect, useState } from 'react';
import { MessageContext, loadUser, saveUser, sendMessage } from "./MessagesContext";

export default function MessagesProvider({ children }: React.PropsWithChildren) {

  const [profile, setProfile] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <MessageContext.Provider value={{email: ''}}>
      {children}
    </MessageContext.Provider>
  )
}
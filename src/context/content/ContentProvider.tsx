import React, { useState, useEffect } from 'react';
import { ContentContext, initialContextValue } from './ContentContext';

export default function ContentProvider({ children }: React.PropsWithChildren): React.ReactElement {

  const [content, setContent] = useState(initialContextValue);

  useEffect(() => {
    fetch('/content.json')
    .then(response => response.json())
    .then(json => {
      setContent(json)
  })
    .catch(e => console.error('Error fetching JSON: ',e));
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  )
}
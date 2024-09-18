import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ContentProvider from './context/content/ContentProvider.tsx';
import GithubProvider from './context/github/GithubProvider.tsx';
import MessagesProvider from './context/messages/MessagesProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContentProvider>
      <GithubProvider>
        <MessagesProvider>
          <App />
        </MessagesProvider>
      </GithubProvider>
    </ContentProvider>
  </React.StrictMode>,
)

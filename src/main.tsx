import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ContentProvider from './context/content/ContentProvider.tsx';
import GithubProvider from './context/github/GithubProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContentProvider>
      <GithubProvider>
        <App />
      </GithubProvider>
    </ContentProvider>
  </React.StrictMode>,
)

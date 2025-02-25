import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import HomePage from './app/pages/HomePage';
import FilesPage from './app/pages/FilesPage';
import SettingsPage from './app/pages/SettingsPage';
import NotFindPage from './app/pages/NotFindPage';
import AuthProvider from './app/providers/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <App />
            </AuthProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="files" element={<FilesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFindPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

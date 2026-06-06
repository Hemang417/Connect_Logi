import 'react-app-polyfill/stable';
import 'core-js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';
import Favicon from "react-favicon";
import FavIcon from "../src/images/connectlogi-favicon.png";

// Create a wrapper component for theme logic
function RootWithTheme() {
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    const observer = new MutationObserver(handleStorageChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason?.name === 'ChunkLoadError') {
        console.error('ChunkLoadError occurred, reloading...');
        window.location.reload(true); // Force reload from server
      }
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Provider store={store}>
      <Favicon url={FavIcon} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: theme === 'dark' ? '#101322' : '#EBEFF8',
            color: theme === 'dark' ? '#EBEFF8' : '#1E2652',
            fontWeight: '500',
            border: `1px solid ${theme === 'dark' ? "#EBEFF8" : "#1E2652"}`,
            borderRadius: '8px',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <App />
    </Provider>
  );
}

// Render the wrapper component
createRoot(document.getElementById('root')).render(<RootWithTheme />);

reportWebVitals();
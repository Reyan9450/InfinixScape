import { useContext } from 'react';
import { AuthenticationPage } from './AuthenticationPage/main';
import { MainPage } from './mainPage/mainPage';
import { AuthContext } from './AuthContext/authContext';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const { user } = useContext(AuthContext);

  const isLogin = !!user; // Double negation to get a boolean value

  return (
    <Routes>
      {/* Protected Route: Only accessible when logged in */}
      {isLogin ? (
        <>
          {/* MainPage Route */}
          <Route path="/main" element={<MainPage />} />

          {/* Default Route redirects to /main when logged in */}
          <Route path="*" element={<Navigate to="/main" />} />
        </>
      ) : (
        <>
          {/* Authentication Page Route */}
          <Route path="/auth" element={<AuthenticationPage />} />

          {/* Default Route redirects to /auth when not logged in */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </>
      )}
    </Routes>
  );
}

export default App;

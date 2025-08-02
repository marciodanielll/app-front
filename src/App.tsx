import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Journey } from './pages/Journey';
import { JourneyHistory } from './pages/JourneyHistory';
import VoiceRecognition from './pages/VoiceRecognition';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useIsAuthenticated } from './store';

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/journey" replace /> : <Login />
          } 
        />
        <Route 
          path="/journey" 
          element={
            <ProtectedRoute>
              <Journey />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/journey/history" 
          element={
            <ProtectedRoute>
              <JourneyHistory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/voice-recognition" 
          element={<VoiceRecognition />} 
        />
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/journey" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
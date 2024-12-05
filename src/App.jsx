import React from 'react';
import { GameTcha } from './components/game-tcha/GameTcha';
import {Register} from './App_Register_page'
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Register />
      </div>
    </div>
  );
}

export default App;
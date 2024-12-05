import React from 'react';
import { Loader2, ShieldCheck, ShieldX, Play } from 'lucide-react';

export const VerificationOverlay = ({ status, onRetry, onStart }) => {
  if (status === 'playing') return null;

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        {status === 'idle' && (
          <>
          <h2 className="text-2xl font-bold text-white mb-4">CAPTCHA Défenseur de Pixels</h2>
          <p className="text-gray-200 mb-2">Défendez-vous contre les envahisseurs de pixels pour vérifier que vous êtes humain</p>
          <div className="text-gray-300 mb-6 space-y-2 text-sm">
          <p>🎮 Commandes : Flèches directionnelles/WASD pour se déplacer, Entrée/Clique pour tirer</p>
          <p>⏱️ Limite de temps : 10 secondes</p>
          <p>🎯 Objectif : Obtenez au moins 30 points pour vérifier</p>
          <p>❤️ Vies : 3 (évitez les collisions avec les ennemis)</p>
          </div>

            <button
              onClick={onStart}
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Play className="w-4 h-4" />
              Start Verification
            </button>
          </>
        )}

        {status === 'verifying' && (
          <div className="flex items-center gap-3 text-white">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Verifying your defense patterns...</span>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <ShieldCheck className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-white text-lg">Verification Successful!</p>
          </div>
        )}

        {status === 'failure' && (
          <div className="text-center">
            <ShieldX className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-white text-lg mb-4">Verification Failed</p>
            <button
              onClick={onRetry}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
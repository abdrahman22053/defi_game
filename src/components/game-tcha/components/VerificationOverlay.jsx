import React from 'react';
import { Loader2, ShieldCheck, ShieldX, Play } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export const VerificationOverlay = ({ status, onRetry, onStart }) => {
  const navigate = useNavigate();

  if (status === 'playing') return null;

  const onVavigate = () => {
    navigate("/register")
  }

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        {status === 'idle' && (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Vérification CAPTCHA Pixel Defender</h2>
            <p className="text-gray-200 mb-2">Défendez-vous contre les envahisseurs de pixels pour prouver que vous êtes humain</p>
            <div className="text-gray-300 mb-6 space-y-2 text-sm">
              <p>🎮 Contrôles : Flèches/WASD pour déplacer, Entrée/Clic pour tirer</p>
              <p>⏱️ Limite de temps : 20 secondes</p>
              <p>🎯 Objectif : Atteindre au moins 30 points pour vérifier</p>
              <p>❤️ Vies : 3 (évitez les collisions avec les ennemis)</p>
            </div>
            <button
              onClick={onStart}
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Play className="w-4 h-4" />
              Démarrer la vérification
            </button>
          </>
        )}

        {status === 'verifying' && (
          <div className="flex items-center gap-3 text-white">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Vérification de vos schémas de défense...</span>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <ShieldCheck className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-white text-lg">Vérification réussie !</p>
            <a onClick={onVavigate}  className='text-white ' >Cliquez <a className='text-blue text-lg'  onClick={onVavigate}> ici </a> pour continuer l'inscription</a>
          </div>
        )}

        {status === 'failure' && (
          <div className="text-center">
            <ShieldX className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-white text-lg mb-4">Échec de la vérification</p>
            <button
              onClick={onRetry}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

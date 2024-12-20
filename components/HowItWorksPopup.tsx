import { Clapperboard, UserPlus, Film } from 'lucide-react'

interface HowItWorksPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksPopup({ isOpen, onClose }: HowItWorksPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 pb-4 max-w-3xl w-full m-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white text-center">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <Clapperboard className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Browse Movies</h3>
            <p className="text-gray-300 text-center">Swipe through a curated list of movies tailored to your preferences.</p>
          </div>
          <div className="flex flex-col items-center">
            <UserPlus className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Connect with Friends</h3>
            <p className="text-gray-300 text-center">Invite friends to join and match movies together.</p>
          </div>
          <div className="flex flex-col items-center">
            <Film className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Find Perfect Matches</h3>
            <p className="text-gray-300 text-center">Discover movies you and your friends both love!</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}


// src/pages/HomePage.tsx

import { useNavigate } from 'react-router-dom';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );
  return JSON.parse(jsonPayload);
}

const HomePage = () => {
  const navigate = useNavigate();

  const idToken = parseJwt(sessionStorage.idToken.toString());
  const accessToken = parseJwt(sessionStorage.accessToken.toString());

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6">
      <div className="bg-white/5 border border-forge-lava/20 rounded-xl p-8 shadow-xl ring-1 ring-white/10 backdrop-blur-lg space-y-6">
        <h1 className="text-3xl font-bold text-forge-heat">
          Welcome to FlowForge
        </h1>

        <p className="text-slate-200 text-lg">
          This is your developer dashboard — powered by a modern, fully serverless React + AWS stack.
        </p>

        <p className="text-sm italic text-slate-400">
          Leander likes to eat cheeseburgers. 🍔
        </p>

        <div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

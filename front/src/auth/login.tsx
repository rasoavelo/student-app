export default function Login() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Se connecter</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full border px-3 py-2 mb-4 rounded"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="w-full border px-3 py-2 mb-4 rounded"
      />
      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Se connecter
      </button>
    </div>
  );
}

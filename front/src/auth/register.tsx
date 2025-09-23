import { useState } from "react";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }
    // Ici tu peux ajouter la logique pour envoyer les données au back
    setError("");
    alert("Inscription réussie !");
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">S'inscrire</h2>
      <input
        type="text"
        placeholder="Nom complet"
        className="w-full border px-3 py-2 mb-4 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border px-3 py-2 mb-4 rounded"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="w-full border px-3 py-2 mb-4 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        className="w-full border px-3 py-2 mb-4 rounded"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        S'inscrire
      </button>
    </div>
  );
}

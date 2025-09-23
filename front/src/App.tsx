import { PencilIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/16/solid";
import { EyeIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function App() {
  const etudiants = [
    {
      id: 1,
      nom: "Jean Dupont",
      email: "jean.dupont@example.com",
      date: "2025-09-20",
    },
    {
      id: 2,
      nom: "Marie Claire",
      email: "marie.claire@example.com",
      date: "2025-09-21",
    },
    {
      id: 3,
      nom: "Ali Mohamed",
      email: "ali.mohamed@example.com",
      date: "2025-09-22",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [newNom, setNewNom] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleAddEtudiant = () => {
    const newEtudiant = {
      id: etudiants.length + 1,
      nom: newNom,
      email: newEmail,
      date: new Date().toISOString().split("T")[0],
    };
    setEtudiants([...etudiants, newEtudiant]);
    setShowModal(false);
    setNewNom("");
    setNewEmail("");
  };
  return (
    <>
      <div>
        <h1 className="text-gray-900 font-bold text-4xl text-center pt-10">
          Liste des etudiants
        </h1>

        <div className="flex justify-center mt-6">
          <div className="w-4/5 h-1 bg-gray-200 shadow-lg rounded-full"></div>
        </div>

        <button
          className="bg-green-500 text-white mx-20 mt-15 mb-0 px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setShowModal(true)}
        >
          Ajouter un nouvel étudiant
        </button>

        <div className="overflow-x-auto px-20 py-15">
          <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="px-4 py-2 border">ID Client</th>
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Date de création</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.map((etudiant) => (
                <tr key={etudiant.id} className="text-center">
                  <td className="px-4 py-2 border">{etudiant.id}</td>
                  <td className="px-4 py-2 border">{etudiant.nom}</td>
                  <td className="px-4 py-2 border">{etudiant.email}</td>
                  <td className="px-4 py-2 border">{etudiant.date}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button className="text-blue-500 hover:text-blue-600">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-600">
                      <PencilIcon className="h-5 w-5" />
                    </button>

                    <button className="text-red-500 hover:text-red-600">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Fond transparent */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Contenu du modal */}
            <div className="relative bg-white p-6 rounded shadow-lg w-96 z-10">
              <h2 className="text-2xl font-bold mb-4">Ajouter un étudiant</h2>
              <input
                type="text"
                placeholder="Nom"
                className="w-full border px-3 py-2 mb-4 rounded"
                value={newNom}
                onChange={(e) => setNewNom(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 mb-4 rounded"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                  onClick={handleAddEtudiant}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

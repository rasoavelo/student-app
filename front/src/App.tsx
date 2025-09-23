import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import Modal from "./component/Modal";

type Etudiant = {
  id: number;
  name: string;
  email: string;
  date?: string;
};

export default function App() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentEtudiant, setCurrentEtudiant] = useState<Etudiant | null>(null);
  const [newNom, setNewNom] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch("http://localhost:5000/students");
      const data = await res.json();
      setEtudiants(data);
    };
    fetchStudents();
  }, []);

  // Ajouter ou modifier
  const handleSave = async () => {
    if (!newNom || !newEmail) return;

    if (currentEtudiant) {
      // 🔹 Modifier
      const res = await fetch(
        `http://localhost:5000/students/${currentEtudiant.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newNom, email: newEmail }),
        }
      );
      const updated = await res.json();
      setEtudiants(etudiants.map((e) => (e.id === updated.id ? updated : e)));
    } else {
      // 🔹 Ajouter
      const res = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newNom, email: newEmail }),
      });
      const added = await res.json();
      setEtudiants([...etudiants, added]);
    }

    setShowModal(false);
    setNewNom("");
    setNewEmail("");
    setCurrentEtudiant(null);
  };

  const handleEdit = (etudiant: Etudiant) => {
    setCurrentEtudiant(etudiant);
    setNewNom(etudiant.name);
    setNewEmail(etudiant.email);
    setModalTitle("Modifier étudiant");
    setShowModal(true);
  };

  const handleView = (etudiant: Etudiant) => {
    setCurrentEtudiant(etudiant);
    setNewNom(etudiant.name);
    setNewEmail(etudiant.email);
    setModalTitle("Détails étudiant");
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" });
    setEtudiants(etudiants.filter((e) => e.id !== id));
  };

  return (
    <div>
      <h1 className="text-gray-900 font-bold text-4xl text-center pt-10">
        Liste des étudiants
      </h1>
      <div className="flex justify-center mt-6">
        <div className="w-4/5 h-1 bg-gray-200 shadow-lg rounded-full"></div>
      </div>

      <button
        className="bg-green-500 text-white mx-20 mt-6 mb-0 px-4 py-2 rounded hover:bg-green-600"
        onClick={() => {
          setCurrentEtudiant(null);
          setNewNom("");
          setNewEmail("");
          setModalTitle("Ajouter un étudiant");
          setShowModal(true);
        }}
      >
        Ajouter un nouvel étudiant
      </button>

      <div className="overflow-x-auto px-20 py-15">
        <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nom</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map((e) => (
              <tr key={e.id} className="text-center">
                <td className="px-4 py-2 border">{e.id}</td>
                <td className="px-4 py-2 border">{e.name}</td>
                <td className="px-4 py-2 border">{e.email}</td>
                <td className="px-4 py-2 border">
                  {e.date || new Date().toISOString().split("T")[0]}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleView(e)}
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-600"
                    onClick={() => handleEdit(e)}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(e.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={showModal}
        title={modalTitle}
        onClose={() => setShowModal(false)}
        onSave={currentEtudiant ? handleSave : handleSave}
      >
        <input
          type="text"
          placeholder="Nom"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
          disabled={modalTitle === "Détails étudiant"}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          disabled={modalTitle === "Détails étudiant"}
        />
      </Modal>
    </div>
  );
}

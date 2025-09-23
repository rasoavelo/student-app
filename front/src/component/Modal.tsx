type ModalProps = {
  show: boolean;
  title: string;
  onClose: () => void;
  onSave?: () => void;
  children: React.ReactNode;
};

export default function Modal({
  show,
  title,
  onClose,
  onSave,
  children,
}: ModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded shadow-lg w-96 z-10">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Annuler
          </button>
          {onSave && (
            <button
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              onClick={onSave}
            >
              Enregistrer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

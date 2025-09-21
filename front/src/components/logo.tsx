// src/components/Logo.tsx
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-bold text-gray-800">
        Gest<span className="text-red-800 font-bold">Etudiant</span>
      </h1>
    </div>
  );
};

export default Logo;

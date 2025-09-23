// controllers/studentController.js
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Récupérer tous les étudiants
export const getStudents = async (req, res) => {
  const students = await prisma.student.findMany();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(students));
};

// Ajouter un étudiant
export const createStudent = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const { name, email } = JSON.parse(body);
    const student = await prisma.student.create({ data: { name, email } });
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(student));
  });
};

// Obtenir un étudiant par ID
export const getStudentById = async (req, res, id) => {
  try {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Étudiant non trouvé" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(student));
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'étudiant par ID:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Erreur serveur" }));
  }
};

// Mettre à jour un étudiant
export const updateStudent = (req, res, id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const { name, email } = JSON.parse(body);
    try {
      const updatedStudent = await prisma.student.update({
        where: { id },
        data: { name, email },
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedStudent));
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'étudiant:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Erreur serveur" }));
    }
  });
};

// Supprimer un étudiant
export const deleteStudent = async (req, res, id) => {
  try {
    const deletedStudent = await prisma.student.delete({
      where: { id },
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Étudiant supprimé", deletedStudent }));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'étudiant:", error);
    if (error.code === "P2025") { // Prisma not found error
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Étudiant non trouvé" }));
    } else {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Erreur serveur" }));
    }
  }
};

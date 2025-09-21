import http from "http";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const server = http.createServer(async (req, res) => {
  // liste étudiant
  if (req.url === "/students" && req.method === "GET") {
    const students = await prisma.student.findMany();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students));
  }

  // ajout étudent
  else if (req.url === "/students" && req.method === "POST") {
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
  }
  // obtenir un étudiant par ID
  else if (req.url.startsWith("/students/") && req.method === "GET") {
    const id = parseInt(req.url.split("/")[2]);

    try {
      const student = await prisma.student.findUnique({
        where: { id },
      });

      if (!student) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Étudiant non trouvé" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(student));
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Erreur serveur" }));
    }
  }
  // mettre à jour un étudiant par ID
  else if (req.url.startsWith("/students/") && req.method === "PUT") {
    let body = "";
    const id = parseInt(req.url.split("/")[2]);

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
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Étudiant non trouvé" }));
      }
    });
  }
  // supprimer un étudiant par ID
  else if (req.url.startsWith("/students/") && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[2]);

    try {
      const deletedStudent = await prisma.student.delete({
        where: { id },
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Étudiant supprimé", deletedStudent }));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Étudiant non trouvé" }));
    }
  }
  // route non trouvée
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route non trouvée" }));
  }
});

server.listen(5000, () => {
  console.log("serveur demarré sur http://localhost:5000");
});

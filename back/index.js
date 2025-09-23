import http from "http";
import { register, login } from "./controllers/authController.js";
import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "./controllers/studentController.js";

const setCors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Auth
  if (req.url === "/auth/register" && req.method === "POST")
    return register(req, res);
  if (req.url === "/auth/login" && req.method === "POST")
    return login(req, res);

  // Students
  if (req.url === "/students" && req.method === "GET")
    return getStudents(req, res);
  if (req.url === "/students" && req.method === "POST")
    return createStudent(req, res);

  if (req.url.startsWith("/students/")) {
    const id = req.url.split("/")[2];
    if (req.method === "GET") return getStudentById(req, res, id);
    if (req.method === "PUT") return updateStudent(req, res, id);
    if (req.method === "DELETE") return deleteStudent(req, res, id);
  }

  // fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route non trouvée" }));
});

server.listen(5000, () => {
  console.log("Serveur démarré sur http://localhost:5000");
});

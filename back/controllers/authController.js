import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { parseBody } from "../utils/parseBody.js";

const prisma = new PrismaClient();

// inscription
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = await parseBody(req);

    if (password !== confirmPassword) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ error: "Les mots de passe ne correspondent pas" })
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Utilisateur créé", user }));
  } catch (err) {
    console.error("Register error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Erreur serveur" }));
  }
};

// connexion
export const login = async (req, res) => {
  try {
    const { email, password } = await parseBody(req);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Utilisateur non trouvé" }));
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Mot de passe incorrect" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Connexion réussie", user }));
  } catch (err) {
    console.error("Login error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Erreur serveur" }));
  }
};

import express from "express";
import { getOwnInfo, getSquadInfo, getUserInfo, listSquads, listUsers, registerSquad, registerUser } from "../controllers";

const router = express();

//GET
router.get("/users/me", getOwnInfo);
router.get("/users/", listUsers);
router.get("/users/:user_id", getUserInfo);
router.get("/teams/", listSquads);
router.get("/teams/:team", getSquadInfo);

//POST
router.post("/users/", registerUser);
router.post("/team/", registerSquad);
router.post("/team/:team_id/member/:user_id");

//PATCH
router.patch("/users/:user_id");
router.patch("/team/:team_id");

//DELETE
router.delete("/team/:team_id/member/:user_id");
router.delete("/users/:user_id");
router.delete("/team/:team_id");

// GET “/users/me” - Ver seu próprio usuário (Todos)
// GET “/users/” - Ver todos os usuários (Admin)
// GET “/users/:user_id” - Ver determinado usuário (Admin, Líder)
// GET “/teams/” - Ver todas as equipes (Admin)
// GET “/teams/:team” - Ver determinada equipe (Admin, Líderes, Funcionário)
// POST “/users/” - Criar um novo usuário (Todos e não autenticado)
// POST “/team/” - Criar uma nova equipe (Admin)
// PATCH “/users/:user_id” - Atualizar usuário (Somente o próprio usuário)
// PATCH “/team/:team_id” - Atualizar equipe (Admin, Líder da equipe)
// POST “/team/:team_id/member/:user_id” - Adicionar membro na equipe (Admin, Líder da equipe)
// DELETE “/team/:team_id/member/:user_id” - Retirar membro da equipe (Admin, Líder da equipe)
// DELETE “/users/:user_id” - Deletar usuário (Admin)
// DELETE “/team/:team_id” - Deletar equipe (Admin)

module.exports = router;

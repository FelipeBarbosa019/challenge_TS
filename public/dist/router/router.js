"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
//GET
router.get("/users/me");
router.get("/users/");
router.get("/users/:user_id");
router.get("/teams/");
router.get("/teams/:team");
//POST
router.post("/users/");
router.post("/team/");
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

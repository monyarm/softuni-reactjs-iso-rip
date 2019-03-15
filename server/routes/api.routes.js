import { Router } from "express";
import * as PostController from "../controllers/post.controller";
import * as UserController from "../controllers/user.controller";
import * as GameController from "../controllers/games.controller";
const router = new Router();

// Get all data
router.route("/posts").get(PostController.getPosts);
router.route("/users").get(UserController.getUsers);
router.route("/games").get(GameController.findGames);
// Get one post by cuid
router.route("/posts/:cuid").get(PostController.getPost);

// Add a new Post
router.route("/posts").post(PostController.addPost);

// Delete a post/user by cuid
router.route("/posts/:cuid").delete(PostController.deletePost);

router.route("/users/:username").delete(UserController.deleteUser);

// User auth routes
router.route("/register").post(UserController.register);

router.route("/login").post(UserController.login);

router.route("/updateUserInfo").post(UserController.updateUserInfo);

export default router;

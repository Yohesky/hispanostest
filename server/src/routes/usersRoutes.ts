import {Router} from "express"
import {loginUser, createUser} from "../controllers/usersController"

const router: Router = Router()

router.post("/signIn", loginUser)

router.post("/signUp", createUser)


export default router
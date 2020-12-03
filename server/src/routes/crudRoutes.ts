import {Router} from "express"
import {allRegisters, create, deleteRegister, updateRegister, registerById} from "../controllers/registersController"
import passport from "passport"


const router: Router = Router()

router.get("/all", passport.authenticate("jwt", {session: false}), allRegisters)

router.post("/create", passport.authenticate("jwt", {session: false}), create)

router.put("/update/:id", passport.authenticate("jwt", {session: false}), updateRegister)

router.delete("/delete/:id", passport.authenticate("jwt", {session: false}), deleteRegister)

router.param("id", registerById)

export default router
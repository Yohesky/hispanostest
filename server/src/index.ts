import express, {Application} from "express"

import cors from "cors"
import passport from "passport"
import passportmiddleware from "../src/config/passport"
import morgan from "morgan"
import crudRoutes from "./routes/crudRoutes"
import usersRoutes from "./routes/usersRoutes"

import "./database"

const index: Application = express()

index.set('port',process.env.PORT || 3000)


index.use(express.json())
index.use(cors())
index.use(morgan("dev"))

index.use(passport.initialize())
passport.use(passportmiddleware)

//routes

index.use("/api/registers", crudRoutes)
index.use("/api/auth", usersRoutes)


export default index;
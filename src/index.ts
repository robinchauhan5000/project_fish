import dontenv from "dotenv";
import Bootstrap from '../src/infrastructure/server/bootstrapServer'
import AppRoutes from "../src/application/routes/index";

dontenv.config()

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO__URI || '';

(() => {
    new Bootstrap({ port, router: AppRoutes,mongoURI:mongoURI});
})();
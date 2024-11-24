import Fastify from "fastify";
import "dotenv/config"
import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { buildAdminRouter,admin } from "./src/config/setup.js";
const start=async()=>{
    const app=Fastify();
    await buildAdminRouter(app);
    await connectDB(process.env.MONGO_URI)
    app.listen(({port:PORT,host:"0.0.0.0"}),(err,adr)=>{
      
        if(err){
            console.log(err)
        }
        else
        {console.log(`blinkit started on http://localhost:${PORT}${admin.options.rootPath}`)}
    })
}
start();
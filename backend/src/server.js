import '../instrument.mjs'; // Sentry instrumentation must be the first import
import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import {clerkMiddleware} from '@clerk/express';
import { serve } from "inngest/express";
import { functions,inngest } from './config/inngest.js';
import chatRoutes from './routes/chat.route.js';
import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json()); // allow parsing JSON request bodies
app.use(clerkMiddleware());
app.get('/',(req,res)=>{
  res.send('Hello World!');
})
app.get('/debug-sentry',(req,res)=>{
  throw new Error("Sentry is working!");
});
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat",chatRoutes);
Sentry.setupExpressErrorHandler(app);





const startServer=async()=>{
  try{
    if(ENV.NODE_ENV !=="production"){
    await connectDB();
    app.listen(ENV.PORT,()=>{
  console.log(`Server is running on port http://localhost:${ENV.PORT}`);
})
    }
  }catch(error){
     console.error("Error starting server:",error);
      process.exit(1);
  }
}
startServer();
export default app;



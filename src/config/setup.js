import AdminJS from "adminjs";
import * as AdminjsMongoose from '@adminjs/mongoose'
import * as  Models from '../models/index.js'
// import { Branch,customer,Admin, delivery } from "../models/index.js";
// import pkg from 'mongoose'
// const { models } = pkg;
import {dark,light,noSidebar} from '@adminjs/themes'

import AdminJSfastify from "@adminjs/fastify";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";
// import { authenticate } from "./config.js";

  AdminJS.registerAdapter(AdminjsMongoose)

export const admin=new AdminJS({
    resources:[
        {
    resource:Models.customer,
    options : {
        listProperties:['phone','role','isActivated','address'],
        filterProperties:['phone','role']
    },
 } ,
        {
    resource:Models.delivery,
    options : {
        listProperties:['email','role','isActivated'],
        filterProperties:['email','role']
    },
 } ,
        {
    resource:Models.Admin ,
    options : {
        listProperties:['email','role','password','isActivated'],
        filterProperties:['email','role','isActivated']
    },
 } ,
        {
    resource:Models.Branch },
    {resource:Models.category},
    {resource:Models.Product}, 
    {resource:Models.counter}, 
    {resource:Models.Order}, 
],
branding:{
    companyName:'blinkit',
    withMadeWithLove:false,
    favicon:'https://res.cloudinary.com/dn2bkta45/image/upload/v1730623204/cld-sample-3.jpg',
    logo:'https://res.cloudinary.com/dn2bkta45/image/upload/v1730623378/us8djgthegmhkc6l0uha.png'

},
rootPath:'/admin',
defaultTheme:dark.id,
availableThemes:[dark,light,noSidebar]

}) 

export const buildAdminRouter=async(app )=>{
    await AdminJSfastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword:COOKIE_PASSWORD,
            cookieName:'admin js'

        },
        app,
        {
            store:sessionStore,
            saveUnintialized:true,
             secret:COOKIE_PASSWORD,
             cookie:{
                 httpOnly:process.env.NODE_ENV==='production',
                 secure:process.env.NODE_ENV==='production',
                 
             }
        }
    )
}
import mongoose from "mongoose";
import 'dotenv/config.js'
import { category ,Product} from "./src/models/index.js";
import { categories, products } from "./seedData.js";


async function seedData(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        // await category.deleteMany({})
        const categorydata=await category.insertMany(categories)
        // console.log(categorydata)
        const categorymap=categorydata.reduce((map,category)=>{
            map[category.name]=category._id;
            console.log(map)
            return map;
           
        },{})
        const productwithcategory=products.map((product)=>({
            ...product,
            category:categorymap[product.category],
         

        }))
        await Product.insertMany(productwithcategory)
        console.log("database is connected")


    }
    catch(err)
    {console.log('not',err)


    }
    finally{
        console.log('database connected ')

    }
}
seedData();
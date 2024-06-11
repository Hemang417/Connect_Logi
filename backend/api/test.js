import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();
const mailarr = [{mail: 'yungcode2003@gmail.com'}, { mail: 'yungcode2003@gmail.com'}]
mailarr.map((eachmail) => {
    console.log(eachmail);
})
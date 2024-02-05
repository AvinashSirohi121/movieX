 
 import axios from "axios";

 const BASE_URL = "https://api.themoviedb.org/3";
 const TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWY1MzU5YWU0ODZlZTE1NDhhMTlmMjM3ZjdlYjYxZiIsInN1YiI6IjYwOGJjZWVhNzFmZmRmMDAzZjNhNzZmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5Zf1m5gTdvkYL9k_fq_GU7lgfjG1JAl6Reh0cy_pqmk";
 console.log("Token => ", TOKEN)
 const headers = {
    Authorization :"Bearer "+TOKEN,
 }

 export const fetchDatafromAPI = async(url,params)=>{
    try{
        const data = await axios.get(BASE_URL + url, {
          headers,
          params,
        });
        console.log("API Data =>",data)
        return data;
    }catch(e){
        console.log("Error while fetching the API data =>>",e)

    }
    
 }
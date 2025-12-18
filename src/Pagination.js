import React,{useState, useEffect} from "react";
import axios from "axios";
import styles from "./pagination.module.css";

export default function Pagination(){
const [employeeData, setEmployeeData]=useState([]);
const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);
  const [page, setPage] = useState(1);
  
let rowsPerPage=10;

const fetchdata= async() =>{
  try{
 let response= await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
 setEmployeeData(response.data);
console.log(response.data);}
catch(error){
  alert("having error in fetching data", error); }
 }    

useEffect(()=>{
fetchdata();
},[] )
     
const calculatepagesRequired = (employeeData, rowsPerPage) => {
   const nofpages=[];
  const num = Math.ceil(employeeData.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    nofpages.push(i);}
    return nofpages;
           //returns no. of pages //
};

const sliceData = (employeeData, page, rowsPerPage) => {
  return employeeData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};
  
  useEffect(() => {
    const nofpages = calculatepagesRequired(employeeData, rowsPerPage);
    setTableRange([...nofpages]);

    const slice = sliceData(employeeData, page, rowsPerPage);
    setSlice([...slice]);
  }, [tableRange, page, slice,employeeData, rowsPerPage]);

return(<>
      <h1 style={{backgroundColor:"lightgrey", padding:"30px", margin:"0px", fontWeight:"normal"}}>Employee Data Table</h1>
      <table style={{backgroundColor:"white",borderBottom:"2px solid rgb(24,145,113)",borderCollapse:"collapse",width:"100%",padding:"10px", marginLeft:"10px", marginRight:"10px"}}>
        <thead style={{color:"white", border:"none",backgroundColor:"rgb(24,145,113)", borderStyle:"none"}}>
          <tr style={{textAlign:"left",height:"30px"}}>
            <th style={{width:"10%",paddingRight:"10px", marginLeft:"20px"}}>ID</th>
            <th style={{width:"30%",paddingRight:"15px"}}>Name</th>
            <th style={{width:"40%",paddingRight:"20px"}}>Email</th>
            <th style={{width:"20%",paddingRight:"10px"}}>Role</th>
          </tr>
        </thead>
        <tbody>
        {slice.map(item => (  
          <tr style={{height:"40px",textAlign:"left",borderBottom:"1px solid darkgrey"}}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
          </tr>) )}
        </tbody>
      </table>
      <div>
        <div style={{margin:"20px",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <button onClick={()=>{
          if(page!==1)
            {setPage(page-1)}}}
          style={{color:"white",height:"30px",borderStyle:"none",borderRadius:"3px", backgroundColor:"rgb(24,145,113)"}}>Previous</button>
        <div 
        style={{display:"flex",alignItems:"center", justifyContent:"center",color:"white",marginLeft:"20px", marginRight:"20px", width:"40px", height:"40px",borderRadius:"3px", backgroundColor:"rgb(24,145,113)"}}>{page}</div>
        <button onClick={()=>{
          if(page<tableRange.length)
            {setPage(page+1)}}}
        style={{color:"white",height:"30px",borderStyle:"none",borderRadius:"3px", backgroundColor:"rgb(24,145,113)"}}>Next</button>
        </div>
      </div>
    </>);
} 


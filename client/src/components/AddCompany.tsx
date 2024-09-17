import axios from "axios";
import { useState } from "react";
import link from "../assets/link.json"
import { GenerateURL } from "./GenerateURL";
import {v4 as uuidv4} from 'uuid'

const AddCompany: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [compLink, setCompLink] = useState<string>("");


const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log("clicked");
  try {
    const email: string | null = localStorage.getItem("email");
    const token: string | null = localStorage.getItem("token");
    console.log(email, token);
    const compID: string = uuidv4();
    const compURL: string = GenerateURL({compName: name, compId: compID});
    console.log(compURL);
    const res = await axios.post(
      `${link.url}/register-company`,
      {
        compName: name,
        reviewURL: compURL,
        email: email,
        about: about,
        compURL: compLink,
        companyId: compID
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};


  return(
  <>
      <form>
        <input type="text" value={name} onChange={(e)=>setName(e.currentTarget.value)} placeholder="Company Name"/>
        <textarea value={about} onChange={(e)=>setAbout(e.currentTarget.value)} placeholder="Tell Us About The Company"/>
        <input type="text" onChange={(e)=>setCompLink(e.currentTarget.value)} value={compLink} placeholder="https://xyz.com"/>
        <button onClick={handleSubmit}>ADD COMPANY</button>
      </form>
    </>
  );
}

export default AddCompany;

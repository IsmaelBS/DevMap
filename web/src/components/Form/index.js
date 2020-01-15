import React, {useState,useEffect} from 'react';
import api from '../../services/api';
import './style.css';

export default function Form({ onSubmit }) {
  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
  const [github_username,setGithubUsername] = useState('');
  const [techs,setTechs] = useState('');

  
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>{
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    },(err) => console.log(err),{
      timeout: 30000
    })
  },[]);

  async function handleAddDev(e) {
    e.preventDefault();
    
    const response = await api.post('/devs',{
      github_username,
      techs,
      latitude,
      longitude
    })

    onSubmit(response.data);
  }

  return (
    <form onSubmit={(e) => handleAddDev(e)}>
        <div className="input-block">
        <label htmlFor="github_username">Usuário do github</label>
        <input type="text" id="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)}/>
        </div>

        <div className="input-block">
        <label htmlFor="tecnologias">Tecnológias</label>
        <input type="text" id="tecnologias" required value={techs} onChange={e => setTechs(e.target.value)} />
        </div>

        <div className="input-group">
        <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input type="number" id="latitude" required onChange={e => setLatitude(e.target.value)}  value={latitude}/>
        </div>

        <div className="input-block">
            <label htmlFor="logitute">Logitute</label>
            <input type="number" id="logitute" required onChange={e => setLongitude(e.target.value)} value={longitude}/>
        </div>
        </div>
        <button type="submit">Salvar</button>   
    </form>
  );
}

import React,{useEffect,useState} from 'react';
import "./Global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import api from './services/api';
import DevItem from './components/DevItem';
import Form from './components/Form';

function App() {
  const [devs,setDevs] = useState([]);

  async function handleSubmit(data) {
    setDevs([...devs, data]);
  }

  useEffect(()=>{
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  },[]);

  return (
   <div id="app">
     <aside>
       <strong>Cadastrar</strong>
       <Form onSubmit={handleSubmit}/>
     </aside>
     <main>
      <ul>
        {devs.map(dev => <DevItem key={dev._id} dev={dev} />)}
      </ul>

     </main>
   </div>
  );
}

export default App;

import {useState, useEffect} from 'react';
import './App.css';

import SearchForm from './components/Search';
import Objects from './components/Objects';


const App = ({api}) => {
  const [list, setList] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  
  useEffect(() => {
      try {
        const getData = async () => {
          let data = await fetch(api);
          data = await data.json();
          setList(data);
        };
        getData();
      } catch (e) {
        console.log(e);
      }
    }, [api],
  );
  const removeItemHandler = async (id) => {
    console.log(id);
    try {
      await fetch(`${api}/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.log(e);
    } finally {
      const checkId = item => item.id !== id;
      setList([...list].filter(checkId));
    }
  };
  
  const handleChange = (e) => {
    const title = e.target.value;
    console.log(title);
    setSearchTitle(title);
  };
  
  return (
    <div className="App">
      <SearchForm title={searchTitle} handleInput={handleChange}/>
      <Objects items={list} title={searchTitle} removeItem={removeItemHandler}/>
    </div>
  );
};
export default App;

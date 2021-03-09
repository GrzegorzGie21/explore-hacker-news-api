import {useState, useEffect} from 'react';
import './App.css';

import SearchForm from './components/Search';
import Objects from './components/Objects';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const App = ({api}) => {
  const [list, setList] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  
  useEffect(() => {
      try {
        const getData = async () => {
          let data = await fetch(`${PATH_BASE}/${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`);
          data = await data.json();
          setList(data);
        };
        getData();
      } catch (e) {
        console.log(e);
      }
    }, [],
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
    <div className="page">
      <div className={'interactions'}>
        <SearchForm title={searchTitle} handleInput={handleChange}>Search</SearchForm>
      </div>
      <Objects items={list} title={searchTitle} removeItem={removeItemHandler}/>
    </div>
  );
};
export default App;

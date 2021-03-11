import {useState, useEffect} from 'react';
import './App.css';

import SearchForm from './components/Search';
import Objects from './components/Objects';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const App = ({api}) => {
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
      try {
        fetchData();
      } catch (e) {
        console.log(e);
      }
    }, [],
  );
  
  const fetchData = async (searchTerm = DEFAULT_QUERY) => {
    let data = await fetch(`${PATH_BASE}/${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`);
    data = await data.json();
    setResult(data);
  };
  
  //this method is used when JSON Server was active
  const removeItemHandler = async (id) => {
    try {
      await fetch(`${api}/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.log(e);
    } finally {
      const checkId = item => item.objectID !== id;
      setResult([...result.hits].filter(checkId));
    }
  };
  
  const dismissItemHandler = (id) => {
    const checkId = item => item.objectID !== id;
    const updatedHits = result.hits.filter(checkId);
    setResult({...result, hits: updatedHits});
  };
  
  const handleChange = (e) => {
    const title = e.target.value;
    setSearchTerm(title);
  };
  
  const searchTermHandler = (e) => {
    fetchData(searchTerm);
    e.preventDefault();
  };
  
  // if (!result) return null;
  return (
    <div className="page">
      <div className={'interactions'}>
        <SearchForm title={searchTerm} handleInput={handleChange} handleSubmit={searchTermHandler}>Search</SearchForm>
      </div>
      {result && <Objects items={result.hits} removeItem={dismissItemHandler}/>}
    </div>
  );
};
export default App;

import {useState, useEffect} from 'react';
import './App.css';

import SearchForm from './components/Search';
import Objects from './components/Objects';

const DEFAULT_QUERY = 'python';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const App = ({api}) => {
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  
  useEffect(() => {
      try {
        const getData = async () => {
          let data = await fetch(`${PATH_BASE}/${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`);
          data = await data.json();
          console.log(data);
          setResult(data);
        };
        getData();
      } catch (e) {
        console.log(e);
      }
    }, [searchTerm],
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
      const checkId = item => item.objectID !== id;
      setResult([...result.hits].filter(checkId));
    }
  };
  
  const dismissItemHandler = (id) => {
    console.log(id);
    const checkId = item => item.objectID !== id;
    const updatedHits = result.hits.filter(checkId);
    setResult({...result, hits: updatedHits});
  }
  
  const handleChange = (e) => {
    const title = e.target.value;
    console.log(title);
    setSearchTerm(title);
  };
  
  if (!result) return null;
  return (
    <div className="page">
      <div className={'interactions'}>
        <SearchForm title={searchTerm} handleInput={handleChange}>Search</SearchForm>
      </div>
      <Objects items={result.hits} title={searchTerm} removeItem={dismissItemHandler}/>
    </div>
  );
};
export default App;

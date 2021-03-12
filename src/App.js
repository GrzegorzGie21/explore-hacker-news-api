import {useState, useEffect} from 'react';
import './App.css';

import SearchForm from './components/Search';
import Objects from './components/Objects';
import Button from './components/Button';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 100;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

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
  
  const fetchData = async (searchTerm = DEFAULT_QUERY, currPage = DEFAULT_PAGE, hpp = DEFAULT_HPP) => {
    let data = await fetch(`${PATH_BASE}/${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${currPage}&${PARAM_HPP}${hpp}`);
    data = await data.json();
    const {hits, page} = data;
    const oldHits = page === 0 ? [] : result.hits;
    const updatedHits = [...oldHits, ...hits];
    setResult({hits: updatedHits, page});
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
  
  const nextPageHandler = (e) => {
    const currentPage = result.page || 0;
    fetchData(searchTerm || DEFAULT_QUERY, currentPage + 1);
    // e.preventDefault();
  };
  
  // if (!result) return null;
  return (
    <div className="page">
      <div className={'interactions'}>
        <SearchForm title={searchTerm}
                    handleInput={handleChange}
                    handleSubmit={searchTermHandler}>
          Search
        </SearchForm>
      </div>
      {result && <Objects items={result.hits} removeItem={dismissItemHandler}/>}
      <div className={'interactions'}>
        {result && <Button onClick={nextPageHandler}>Next</Button>}
      </div>
    </div>
  );
};
export default App;

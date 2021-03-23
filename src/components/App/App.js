import {useEffect, useState} from 'react';
import './App.css';

import SearchForm from '../Search';
import Objects from '../Objects';
import Button from '../Button';

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  DEFAULT_PAGE,
  
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  PATH_SEARCH,
  PATH_BASE,
} from '../../constants';


const App = ({api}) => {
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [searchKey, setSearchKey] = useState(searchTerm);
  
  const fetchData = async (searchTerm, currPage = DEFAULT_PAGE) => {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${currPage}&${PARAM_HPP}${DEFAULT_HPP}`;
    let data = await fetch(url);
    data = await data.json();
    setSearchTopStories(data);
    // setSearchKey(searchTerm)
    // const {hits, page} = data;
    // // setSearchKey(searchTerm);
    // // console.log('searchKey: ', searchKey);
    // const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    // const updatedHits = [...oldHits, ...hits];
    // // console.log(updatedHits);
    // // setResults({hits: updatedHits, page});
    // setResults({...results, [searchKey]: {hits: updatedHits, page}});
  };
  const setSearchTopStories = ({hits, page}) => {
    console.log(hits, page);
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    setResults({...results, [searchKey]: {hits: updatedHits, page}});
  };
  useEffect(() => setSearchKey(searchTerm), [searchTerm]);
  
  useEffect(() => {
      // setSearchKey(searchTerm);
      // setSearchTerm('dupa');
      // console.log('searchTerm: ', searchTerm);
      try {
        fetchData(searchTerm);
      } catch (e) {
        console.log(e);
      }
    }, [],
  );
  
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
      setResults([...results.hits].filter(checkId));
    }
  };
  
  const dismissItemHandler = (id) => {
    const checkId = item => item.objectID !== id;
    const page = results[searchKey].page;
    const updatedHits = results[searchKey].hits.filter(checkId);
    setResults({...results, [searchKey]: {hits: updatedHits, page}});
  };
  
  const handleChange = (e) => {
    const title = e.target.value;
    setSearchTerm(title);
    // setSearchKey(title)
  };
  
  const shouldSearchApi = searchTerm => !results[searchTerm];
  
  const searchTermHandler = (e) => {
    // setSearchKey(searchTerm);
    console.log(searchKey);
    console.log(searchTerm);
    if (shouldSearchApi(searchTerm)) fetchData(searchTerm);
    e.preventDefault();
  };
  
  const nextPageHandler = (e) => {
    const currentPage = (results && results[searchKey] && results[searchKey].page) || 0;
    fetchData(searchTerm, currentPage + 1);
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
      {results && results[searchKey] && <Objects items={results[searchKey].hits} removeItem={dismissItemHandler}/>}
      <div className={'interactions'}>
        {results && <Button onClick={nextPageHandler}>Next</Button>}
      </div>
    </div>
  );
};
export default App;

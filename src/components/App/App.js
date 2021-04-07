import {useEffect, useState, useRef} from 'react';
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';

import SearchForm from '../Search';
import Objects from '../Objects';
import Button from '../Button';
import Loading from '../Loading';

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

library.add(fas);

const App = () => {
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [searchKey, setSearchKey] = useState(searchTerm);
  const input = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchData = async (searchTerm, currPage = DEFAULT_PAGE) => {
    setIsLoading(true);
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${currPage}&${PARAM_HPP}${DEFAULT_HPP}`;
    let data = await fetch(url);
    data = await data.json();
    setSearchTopStories(data);
  };
  
  const setSearchTopStories = ({hits, page}) => {
    console.log(hits, page);
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    setResults({...results, [searchKey]: {hits: updatedHits, page}});
    setIsLoading(false);
  };
  useEffect(() => setSearchKey(searchTerm), [searchTerm]);
  // useEffect(() => setIsLoading(true), [results]);
  
  useEffect(() => {
      try {
        fetchData(searchTerm);
      } catch (e) {
        console.log(e);
      }
      // input.current.focus();
    }, [],
  );
  
  //this method is used when JSON Server was active
  const removeItemHandler = async (id) => {
    const api = 'http://localhost:3001/objects';
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
  };
  
  const shouldSearchApi = searchTerm => !results[searchTerm];
  
  const searchTermHandler = (e) => {
    console.log(searchKey);
    console.log(searchTerm);
    if (shouldSearchApi(searchTerm)) fetchData(searchTerm);
    e.preventDefault();
  };
  
  const nextPageHandler = (e) => {
    const currentPage = (results && results[searchKey] && results[searchKey].page) || 0;
    fetchData(searchTerm, currentPage + 1);
  };
  
  const searchClickHandler = () => {
    input.current.focus();
  };
  
  // if (isLoading) return <Loading/>;
  return (
    <div className="page">
      <div className={'interactions'}>
        <SearchForm title={searchTerm}
                    handleInput={handleChange}
                    handleSubmit={searchTermHandler}
                    input={input}
                    onClick={searchClickHandler}>
          Search
        </SearchForm>
      </div>
      {results && results[searchKey] && <Objects items={results[searchKey].hits} removeItem={dismissItemHandler}/>}
      <div className={'interactions'}>
        {isLoading ? <FontAwesomeIcon icon={'spinner'} size={'3x'} pulse/> : <Button onClick={nextPageHandler}>Next</Button>}
      </div>
    </div>
  );
};

export default App;

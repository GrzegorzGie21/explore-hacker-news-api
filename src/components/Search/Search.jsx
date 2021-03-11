import Button from './Button';

const SearchForm = ({title, handleInput, handleSubmit, children}) =>
  <form onSubmit={handleSubmit}>
    <label htmlFor="searchTitle">
      <input type="text" name='searchTitle' value={title} onChange={handleInput} placeholder={children}/>
      <Button type={'submit'}>Search</Button>
    </label>
  </form>;

export default SearchForm;
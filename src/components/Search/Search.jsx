const SearchForm = ({title, handleInput, children}) => {
  return (
    <form>
      <label htmlFor="searchTitle">
        <input type="text" name='searchTitle' value={title} onChange={handleInput} placeholder={children}/>
      </label>
    </form>
  )
}

export default SearchForm;
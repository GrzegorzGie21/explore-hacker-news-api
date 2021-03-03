const SearchForm = ({title, handleInput}) => {
  return (
    <form>
      <label htmlFor="searchTitle">
        <input type="text" name='searchTitle' value={title} onChange={handleInput}/>
      </label>
    </form>
  )
}

export default SearchForm;
import PropTypes from 'prop-types';
import Button from '../Button';

const SearchForm = ({title, handleInput, handleSubmit, children}) =>
  <form onSubmit={handleSubmit}>
    <label htmlFor="searchTitle">
      <input type="text" name='searchTitle' value={title} onChange={handleInput} placeholder={title}/>
      <Button type={'submit'}>{children}</Button>
    </label>
  </form>;

SearchForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SearchForm;
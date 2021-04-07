import PropTypes from 'prop-types';
import Button from '../Button';

const SearchForm = ({title, handleInput, handleSubmit, children, input, onClick}) =>
  <form onSubmit={handleSubmit}>
    <label htmlFor="searchTitle">
      <input type="text" name='searchTitle'
             value={title}
             onChange={handleInput}
             placeholder={title}
             ref={input}/>
      <Button type={'submit'} onClick={onClick}>{children}</Button>
    </label>
  </form>;

SearchForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SearchForm;
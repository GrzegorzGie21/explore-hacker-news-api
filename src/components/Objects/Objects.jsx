import PropTypes from 'prop-types';
import Button from '../Button';

const Objects = ({items, removeItem}) =>
  <div className={'table'}>
    <div className={'table-header'}>
      <span>Title</span>
      <span>Author</span>
      <span>Number of comments</span>
      <span>Points</span>
      <span>Action</span>
    </div>
    {items.map(item => (
        <div key={item.objectID} className={'table-row'}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
              <Button onClick={() => removeItem(item.objectID)} className={'button-inline'}>Remove</Button>
            {/*<button type='button' onClick={() => removeItem(item.id)}>Remove</button>*/}
            </span>
        </div>
      ),
    )
    }
  </div>;

Objects.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      url: PropTypes.url,
      title: PropTypes.string,
      author: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    }),
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
};
export default Objects;
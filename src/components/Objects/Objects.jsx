import searchItemByTitle from '../../utils';
import Button from '../Search/Button';

const Objects = ({items, title, removeItem}) =>
  <div>
    {items.filter(searchItemByTitle(title)).map(item => (
        <div key={item.id}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
              <Button onClick={() => removeItem(item.id)}>Remove</Button>
            {/*<button type='button' onClick={() => removeItem(item.id)}>Remove</button>*/}
            </span>
        </div>
      ),
    )
    }
  </div>;


export default Objects;
import searchItemByTitle from '../../utils';

const Objects = ({items, title, removeItem}) => {
  return (
    items.filter(searchItemByTitle(title)).map(item => (
        <div key={item.id}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
              <button type='button' onClick={() => removeItem(item.id)}>Remove</button>
            </span>
        </div>
      ),
    )
  );
};

export default Objects;
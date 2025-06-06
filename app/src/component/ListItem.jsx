// component for the list items

import '../styles/listItem.css';

const ListItem = ({ item,  showArrows = false, onMoveLeft, onMoveRight  }) => (
  <div className="list-item">
    <h3 className="list-item-name">{item.name}</h3>
    <p className="list-item-description">{item.description}</p>
    
    {showArrows && (
      <div className="item-arrows">
        {onMoveLeft && <button className='arrow-buttons' id='point-left-side' onClick={onMoveLeft}>←</button>}
        {onMoveRight && <button className='arrow-buttons' id='point-right-side' onClick={onMoveRight}>→</button>}
      </div>
    )}
  </div>
);

export default ListItem;

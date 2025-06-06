// Component to display the fetched lists 

import ListItem from './ListItem';
import '../styles/listContainer.css';

const ListContainer = ({ list, isChecked, showCheckbox = true, onCheck, showArrows = false, onMoveLeft, onMoveRight}) => {
  const renderListItem = (item) => (
    <ListItem
      key={item.id}
      item={item}
      showArrows={showArrows}
      onMoveLeft={onMoveLeft ? () => onMoveLeft(item) : undefined}
      onMoveRight={onMoveRight ? () => onMoveRight(item) : undefined}
/>
  );

  return (
    <div className="list-box">
      <div className="list-title">
        {showCheckbox && (
          <input type="checkbox" checked={isChecked} onChange={onCheck} />
        )}
        <h3 className="list-number">
          {list.title ?? `List ${list.list_number}`}
        </h3>
      </div>
      <div className="list-items-container">
        {list.items.map(renderListItem)}
      </div>
    </div>
  );
};


export default ListContainer;

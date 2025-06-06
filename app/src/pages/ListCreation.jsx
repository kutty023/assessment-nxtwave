// pages/ListCreation.jsx
import { useState, useEffect } from "react";
import ListContainer from "../component/ListContainer";
import Loader from "../component/Loader";
import Button from "../component/button";
import "../styles/listContainer.css";
import "../styles/ListCreation.css";

function ListCreation({ selectedLists, setView, listsData, setListsData }) {
  const [newListItems, setNewListItems] = useState([]);

  const newListNumber = Math.max(...listsData.map(list => list.list_number)) + 1;

  const firstList = listsData.find(list => list.list_number === selectedLists[0]);
  const secondList = listsData.find(list => list.list_number === selectedLists[1]);

  useEffect(() => {
    setNewListItems([]);
  }, [selectedLists]);

  const handleMoveToMiddle = (item, from) => {
    if (from === "left") {
      const updatedListsData = listsData.map(list => {
        if (list.list_number === firstList.list_number) {
          return {
            ...list,
            items: list.items.filter(i => i.id !== item.id),
          };
        }
        return list;
      });
      setListsData(updatedListsData);
    } else {
      const updatedListsData = listsData.map(list => {
        if (list.list_number === secondList.list_number) {
          return {
            ...list,
            items: list.items.filter(i => i.id !== item.id),
          };
        }
        return list;
      });
      setListsData(updatedListsData);
    }
    setNewListItems(prev => [...prev, item]);
  };

 const handleMoveBackToOriginal = (item, direction) => {
    setNewListItems(prev => prev.filter(i => i.id !== item.id));

    if (direction === "left") {
      const updatedListsData = listsData.map(list => {
        if (list.list_number === firstList.list_number) {
          return {
            ...list,
            items: [...list.items, item],
          };
        }
        return list;
      });
      setListsData(updatedListsData);
    } else {
      const updatedListsData = listsData.map(list => {
        if (list.list_number === secondList.list_number) {
          return {
            ...list,
            items: [...list.items, item],
          };
        }
        return list;
      });
      setListsData(updatedListsData);
    }
  };

  const handleCancel = () => {
    setView("all");
  };

  const handleUpdate = () => {
    const newList = {
      list_number: newListNumber,
      items: newListItems,
      title: `List ${newListNumber} (${newListItems.length})`
    };
    setListsData(prev => [...prev, newList]);
    setView("all");
  };

  if (!firstList || !secondList) {
    return <Loader />;
  }

  return (
    <>
      <div className="lists-container">
        <ListContainer
          list={{ ...firstList, title: `List ${firstList.list_number} (${firstList.items.length})` }}
          isChecked={false}
          onCheck={() => {}}
          showArrows={true}
          showCheckbox={false}
          onMoveRight={item => handleMoveToMiddle(item, "left")}

        />

        <ListContainer
          list={{ list_number: newListNumber, items: newListItems, title: `List ${newListNumber} (${newListItems.length})` }}
          isChecked={false}
          onCheck={() => {}}
          showArrows={true}
          showCheckbox={false}
          onMoveLeft={item => handleMoveBackToOriginal(item, "left")}
          onMoveRight={item => handleMoveBackToOriginal(item, "right")}
        />

        <ListContainer
          list={{ ...secondList, title: `List ${secondList.list_number} (${secondList.items.length})` }}
          isChecked={false}
          onCheck={() => {}}
          showArrows={true}
          showCheckbox={false}
          onMoveLeft={item => handleMoveToMiddle(item, "right")}
        />
      </div>

      <div className="update-cancel-btn-container">
        <Button id="cancel-btn" onClick={handleCancel} label= "Cancel" />
        <Button id="update-btn" onClick={handleUpdate} disabled={newListItems.length === 0} label= "Update" />
      </div>
    </>
  );
}

export default ListCreation;

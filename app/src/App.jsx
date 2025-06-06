import { useState } from 'react';
import AllListsView from './pages/AllListsView';
import ListCreation from './pages/ListCreation';

const VIEWS = {
  ALL: 'all',
  CREATE: 'create',
};

function App() {
  const [listsData, setListsData] = useState([]);
  const [view, setView] = useState(VIEWS.ALL);
  const [selectedLists, setSelectedLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSetView = (newView) => {
    if (newView === VIEWS.ALL) {
      setSelectedLists([]);
      setErrorMessage('');
    }
    setView(newView);
  };

  if (view === VIEWS.ALL) {
    return (
      <AllListsView
        listsData={listsData}
        setListsData={setListsData}
        setView={handleSetView}
        selectedLists={selectedLists}
        setSelectedLists={setSelectedLists}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  } else if (view === VIEWS.CREATE) {
    return (
      <ListCreation
        selectedLists={selectedLists}
        setView={handleSetView}
        listsData={listsData}
        setListsData={setListsData}
      />
    );
  } else {
    return null;
  }
}

export default App;

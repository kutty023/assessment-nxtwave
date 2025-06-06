import { useState, useEffect } from "react";
import Loader from '../component/Loader';
import FailureView from '../component/FailureView';
import ErrorMessage from '../component/ErrorMessage';
import ListContainer from '../component/ListContainer';
import Button from "../component/button";
import '../styles/AllListsView.css';

function AllListsView({listsData, setListsData, setView, selectedLists, setSelectedLists, errorMessage, setErrorMessage}){
    const [status, setStatus] = useState('loading');

    const fetchLists = async ()=>{
        setStatus('loading');

        try{
            const response = await fetch ('https://apis.ccbp.in/list-creation/lists');

            if(!response.ok) throw new Error('Failed');

            const data = await response.json();

            const groupedData = data.lists.reduce((acc, item) =>{
                const {list_number} = item;
                if(!acc[list_number]){
                    acc[list_number] = {
                        list_number,
                        items : []
                    };
                }
                acc[list_number].items.push(item);
                return acc;
            }, {});
            setListsData(Object.values(groupedData));
            setStatus('success');
        } catch{
            setStatus('failure');
        };
    };

    useEffect(() =>{
        if(listsData.length === 0){
            fetchLists();
        } else{
            setStatus("success");
        }
    }, []);

    const onListCheck = (id) =>{
        const updated = selectedLists.includes(id) ? selectedLists.filter(lid => lid !== id) : [...selectedLists, id];
        setSelectedLists(updated);
    };

    const handleCreate = () =>{
        if(selectedLists.length !== 2){
            setErrorMessage( "*You should select exactly 2 lists to create a new list");
        } else{
            setErrorMessage('');
            setView('create');
        }
    };
    if(status == "loading") return <Loader />;
    if(status == "failure") return <FailureView onRetry={fetchLists} />;

    return(
        <>
        <div className="create-new-list-container">
            <h2 id="title">List Creation</h2>
            <Button id="new-list-btn" onClick={handleCreate} label="Create a new list" />
            <ErrorMessage message={errorMessage} />
        </div>
        <div className="lists-container">
            {listsData.map(list => (
                <ListContainer key={list.list_number} list={list} isChecked={selectedLists.includes(list.list_number)} onCheck={() => onListCheck(list.list_number)} showArrows={false} />
            ))}
        </div>
        </>
    );
};

export default AllListsView;
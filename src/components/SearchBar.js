import React, { useState } from 'react';
import '../style/SearchBar.css';

function SearchBar({ onSearch }) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearchClick = () => {
    onSearch(localSearchTerm); 
   setLocalSearchTerm('')
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default SearchBar;

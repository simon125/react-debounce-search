import React from 'react';
import './style.css';
import { fetchSearchResults } from './utils';
import ListItem from './components/ListItem';
import SearchInput from './components/SearchInput';
import debounce from 'lodash.debounce';

const fetchData = async (query, cb) => {
  console.warn('fetching ' + query);
  const res = await fetchSearchResults(query);
  cb(res);
};

// const debouncedFetchData = debounce((query, cb) => {
//   fetchData(query, cb);
// }, 500);

const debouncedFetchData = (query, cb) => {
  fetchData(query, cb);
};

export default function App() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    debouncedFetchData(query, (res) => {
      setResults(res);
    });
  }, [query]);

  return (
    <div>
      <SearchInput
        value={query}
        onChangeText={(e) => {
          setQuery(e.target.value);
        }}
      />
      {results.map((result, index) => (
        <div key={index}>
          <ListItem
            title={result.name}
            imageUrl={result.image_url}
            caption={result.tagline}
          />
        </div>
      ))}
    </div>
  );
}

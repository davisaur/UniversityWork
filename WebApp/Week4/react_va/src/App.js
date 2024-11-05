import React from 'react';
import Results from './Results.js';

class App extends React.Component {
  render = () => {
    return (
      <div>
        <h1>Search the Victoria &amp; Albert Museum</h1>
        <form>
          <label htmlFor="txtSearch">Search term:</label>
          <input id="txtSearch" type="text" />
          <button type="submit">Search</button>
        </form>
        <form onSubmit={this.handleSubmit}></form>
        <Results state={this.state} />
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      loading: false,
      records: []
    };
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
  
    const query = document.querySelector('#txtSearch').value.trim();
  
    if (query.length > 0) {
  
      this.setState({
        query: query,
        loading: true
      });
      
      const url = 'https://api.vam.ac.uk/v2/objects/search'
                + '?images_exist=1'
                + '&q=' + encodeURIComponent(query);
      try {
        const response = await fetch(url, {'method': 'GET'});
        const jsonData = await response.json();
        this.setState({
            loading: false,
            records: jsonData.records
        });
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
          records: []
        });
      }
    }
  }
  
}

export default App;
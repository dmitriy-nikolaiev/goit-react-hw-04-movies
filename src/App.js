import { Component } from 'react';
import './styles.css';

import { getTrending } from './services/apiService';

import HomePage from './components/HomePage';

class App extends Component {
  state = {
    trending: [],
    page: 1,
  };

  maxPages = 0;

  componentDidMount(prevProps, prevState) {
    this.getTrendingHandler();
  }

  getTrendingHandler = async () => {
    const { trending, page } = this.state;
    // this.setState({ isLoading: true, error: '' });
    try {
      const result = await getTrending(page);
      console.log(result, 'result trending');
      if (result.total_results !== 0) {
        this.maxPages = result.total_pages;

        this.setState(() => ({
          trending: [...trending, ...result.results],
        }));
      } else {
        // console.log('Not found');
        this.maxPages = 0;
        this.setState(() => ({
          trending: [],
          page: 1,
          // error: 'No results were found for your search.',
        }));
      }
    } catch (error) {
      console.error(error);
      // this.setState(() => ({ error: error.toString() }));
      // } finally {
      //   this.setState({ isLoading: false });

      //   // this.scrollToHandler();
    }
  };

  render() {
    return (
      <div className="App">
        <HomePage trending={this.state.trending} />
      </div>
    );
  }
}

export default App;

import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar';
import { LoadMoreButton } from './LoadMoreButton';
import { ImageGallery } from './ImageGallery';
import { fetchQuery } from 'Services/Services';
import { Loader } from './Loader';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    photos: null,
    isLoading: false,
  };

  onSubmit = query => {
    this.setState({ query, page: 1, photos: null });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      fetchQuery(this.state.query, this.state.page).then(data => {
        if (data.length === 0) {
          console.log('error');
          return this.setState({ isLoading: false });
        }
        if (prevState.photos === null) {
          return this.setState({ photos: data, isLoading: false });
        }
        this.setState(prevState => ({
          photos: [...prevState.photos, ...data],
          isLoading: false,
        }));
      });
    }
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ImageGallery query={this.state.query} photos={this.state.photos} />
        )}

        {this.state.photos && (
          <LoadMoreButton onClick={this.onLoadMore}>Load more</LoadMoreButton>
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

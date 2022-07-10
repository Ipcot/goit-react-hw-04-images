import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar';
import { LoadMoreButton } from './LoadMoreButton';
import { ImageGallery } from './ImageGallery';
import { fetchQuery } from 'Services/Services';
import { Loader } from './Loader';
import { mapper } from 'utils/mapper';
import { Modal } from './Modal';
// import { ImageGalleryItem } from './ImageGalleryItem';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    payload: [],
    isLoading: false,
    largeImg: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      // prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages(this.state.query, this.state.page);

      // this.setState({ isLoading: true });
      // fetchQuery(this.state.query, this.state.page).then(data => {
      //   if (data.length === 0) {
      //     this.setState({ isLoading: false });
      //     return toast.error(`No image on ${this.state.query} query`, {
      //       theme: 'colored',
      //     });
      //   }
      //   this.setState(prevState => ({
      //     payload: [...prevState.payload, ...data],
      //     isLoading: false,
      //   }));
      // });
    }
    if (prevState.query !== this.state.query) {
      this.getImages(this.state.query, this.state.page);
    }
  };

  getImages = (query, page) => {
    this.setState({ isLoading: true });
    fetchQuery(query, page)
      .then(data => {
        this.setState({ payload: [...this.state.payload, ...mapper(data)] });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  onSubmit = query => {
    // this.getImages(this.state.query, this.state.page);
    this.setState({ query, page: 1, payload: [] });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  onOpenModal = largeImg => {
    console.log(largeImg);
    this.setState({ largeImg: largeImg });
  };

  onCloseModal = () => {
    this.setState({ largeImg: '' });
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            // query={this.state.query}
            payload={this.state.payload}
            onOpenModal={this.onOpenModal}
          />
        )}

        {this.state.payload.length > 0 && (
          <LoadMoreButton onClick={this.onLoadMore}>Load more</LoadMoreButton>
        )}
        {this.state.largeImg !== '' && (
          <Modal
            largeImg={this.state.largeImg}
            onCloseModal={this.onCloseModal}
          />
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

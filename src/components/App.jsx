import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar';
import { LoadMoreButton } from './LoadMoreButton';
import { ImageGallery } from './ImageGallery';
import { fetchQuery } from 'Services/Services';
import { Loader } from './Loader';
import { mapper } from 'utils/mapper';
import { Modal } from './Modal';
import { CustomToast } from './CustomToast';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    payload: [],
    isLoading: false,
    largeImg: '',
  };

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages(this.state.query, this.state.page);
    }
  };

  getImages = (query, page) => {
    this.setState({ isLoading: true });
    fetchQuery(query, page)
      .then(data => {
        this.setState({ payload: [...this.state.payload, ...mapper(data)] });
      })
      .catch(error =>
        toast.error(error.message, {
          theme: 'colored',
        })
      )
      .finally(() => this.setState({ isLoading: false }));
  };

  onSubmit = query => {
    if (query === this.state.query) {
      return;
    }
    this.setState({ query, page: 1, payload: [] });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  onOpenModal = largeImg => {
    this.setState({ largeImg: largeImg });
  };

  onCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.setState({ largeImg: '' });
    }
  };

  render() {
    // const customId = 'custom-id-yes';
    const { isLoading, payload, query, largeImg } = this.state;
    return (
      <>
        <GlobalStyle />
        <div>
          <Searchbar onSubmit={this.onSubmit} />
          {isLoading && <Loader />}
          {payload.length === 0 && query !== '' && isLoading === false && (
            <CustomToast />
          )}

          {/* {this.state.payload.length === 0 &&
            this.state.query !== '' &&
            this.state.isLoading === false &&
            toast.error(`No image on ${this.state.query} query`, {
              theme: 'colored',
              toastId: customId,
            })} */}
          {payload.length > 0 && (
            <ImageGallery
              query={query}
              payload={payload}
              onOpenModal={this.onOpenModal}
            />
          )}

          {payload.length > 0 && (
            <LoadMoreButton onClick={this.onLoadMore}>Load more</LoadMoreButton>
          )}
          {largeImg !== '' && (
            <Modal
              largeImg={largeImg}
              onCloseModal={this.onCloseModal}
              query={query}
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
      </>
    );
  }
}

import { useState, useEffect } from 'react';
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

export const App = () => {
  const [page, setPage] = useState(1);
  const [queryState, setQueryState] = useState('');
  const [payloadState, setPayloadState] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [largeImgState, setLargeImgState] = useState('');

  useEffect(() => {
    if (queryState === '') {
      return;
    }
    const getImages = (query, page) => {
      setIsLoadingState(true);
      fetchQuery(query, page)
        .then(data => {
          setPayloadState(state => [...state, ...mapper(data)]);
        })
        .catch(error =>
          toast.error(error.message, {
            theme: 'colored',
          })
        )
        .finally(() => setIsLoadingState(false));
    };

    getImages(queryState, page);
  }, [queryState, page]);

  const onSubmit = query => {
    if (query === queryState) {
      return;
    }
    setQueryState(query);
    setPage(1);
    setPayloadState([]);
  };

  const onLoadMore = () => {
    setPage(state => state + 1);
  };

  const onOpenModal = largeImg => {
    setLargeImgState(largeImg);
  };

  const onCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setLargeImgState('');
    }
  };

  return (
    <>
      <GlobalStyle />
      <div>
        <Searchbar onSubmit={onSubmit} />
        {isLoadingState && <Loader />}
        {payloadState.length === 0 &&
          queryState !== '' &&
          isLoadingState === false && <CustomToast />}

        {payloadState.length > 0 && (
          <ImageGallery
            query={queryState}
            payload={payloadState}
            onOpenModal={onOpenModal}
          />
        )}

        {payloadState.length > 0 && (
          <LoadMoreButton onClick={onLoadMore}>Load more</LoadMoreButton>
        )}
        {largeImgState !== '' && (
          <Modal
            largeImg={largeImgState}
            onCloseModal={onCloseModal}
            query={queryState}
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
};

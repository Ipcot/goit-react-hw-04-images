import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Component } from 'react';
// import { fetchQuery } from 'Services/Services';
// import { Loader } from 'components/Loader';

export const ImageGallery = ({ photos }) => {
  // state = {
  //   photos: null,
  //   isLoading: false,
  // };
  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevProps.query !== this.props.query) {
  //     this.setState({ isLoading: true });
  //     fetchQuery(this.props.query).then(data =>
  //       this.setState({ photos: data, isLoading: false })
  //     );
  //   }
  // };

  return (
    <>
      <ul>
        {photos && <ImageGalleryItem photos={photos} />}
        {/* {photos === null && <p>No images on this query</p>} */}
      </ul>
    </>
  );
};

import { ImageGalleryItem } from 'components/ImageGalleryItem';
// import { Component } from 'react';
// import { fetchQuery } from 'Services/Services';
// import { Loader } from 'components/Loader';

export const ImageGallery = ({ payload, onOpenModal }) => {
  return (
    <>
      <ul>
        {payload.length > 0 &&
          payload.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              smallImg={webformatURL}
              largeImg={largeImageURL}
              onOpenModal={onOpenModal}
            />
          ))}
        {/* {payload === null && <p>No images on this query</p>} */}
      </ul>
    </>
  );
};

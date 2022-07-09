export const ImageGalleryItem = ({ photos }) => {
  return (
    <>
      {photos &&
        photos.map(item => {
          return (
            <li key={item.id}>
              <img src={item.webformatURL} alt="collection" />
            </li>
          );
        })}
    </>
  );
};

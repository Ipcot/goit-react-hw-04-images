export const ImageGalleryItem = ({ smallImg, largeImg, onOpenModal }) => {
  return (
    <>
      <li
        onClick={() => {
          onOpenModal(largeImg);
        }}
      >
        <img src={smallImg} alt="collection" />
      </li>
    </>
  );
};

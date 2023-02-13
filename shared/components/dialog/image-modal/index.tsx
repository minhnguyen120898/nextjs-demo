import styles from "./image-modal.module.scss";

export interface ImageModalProps {
  imageSrc: string,
  handleImageModal: () => void
}

export const ImageModal = ({ imageSrc, handleImageModal }: ImageModalProps) => {
  return (
    <div className={styles.modal}>
      <span className={styles.close} onClick={handleImageModal}>&times;</span>
      <img src={imageSrc} />
    </div>
  );
};
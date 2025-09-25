import { IKImage } from "imagekitio-react";
import PropTypes from "prop-types";

const ImageWithFallback = ({ path, alt, className, width, height, fallback }) => {
  return path ? (
    <IKImage
      path={path}
      alt={alt}
      className={className}
      width={width}
      height={height}
      crop="at_least"
      dpr="2"
    />
  ) : (
    <img src={fallback} alt={alt} className={className} />
  );
};

ImageWithFallback.propTypes = {
  path: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fallback: PropTypes.string.isRequired,
};

export default ImageWithFallback;

import PropTypes from "prop-types";
import ImageWithFallback from "./ImageWithFallback";

const ProfileSection = ({ imagePath, profileName, profileJob }) => (
  <div className="mt-4 flex items-center gap-3">
    <ImageWithFallback
      path={imagePath}
      alt={profileName}
      className="h-10 w-10 rounded-full object-cover"
      width="40"
      height="40"
      fallback="https://via.placeholder.com/40x40?text=User"
    />
    <div className="text-sm">
      <p className="text-clr-text-light font-medium">{profileName}</p>
      <p className="text-clr-text-light text-xs">{profileJob}</p>
    </div>
  </div>
);

ProfileSection.propTypes = {
  imagePath: PropTypes.string,
  profileName: PropTypes.string.isRequired,
  profileJob: PropTypes.string.isRequired,
};

export default ProfileSection;

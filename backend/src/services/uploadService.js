const { uploadToCloudinary } = require('../middleware/fileUpload');

exports.uploadEventImage = async (file) => {
  try {
    const url = await uploadToCloudinary(file);
    return url;
  } catch (error) {
    throw new Error('Failed to upload event image');
  }
};

exports.uploadProviderLogo = async (file) => {
  try {
    const url = await uploadToCloudinary(file);
    return url;
  } catch (error) {
    throw new Error('Failed to upload provider logo');
  }
};

exports.uploadAvatar = async (file) => {
  try {
    const url = await uploadToCloudinary(file);
    return url;
  } catch (error) {
    throw new Error('Failed to upload avatar');
  }
};
import cloudinary from '@/lib/cloudinary';

export function uploadToCloudinary(buffer, { folder }) {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });
  } catch (error) {
    console.log('error', error);
  }
}
export async function deleteFromCloudinary(id) {
  if (!id) return;
  return cloudinary.uploader.destroy(id, { resource_type: 'image' });
}

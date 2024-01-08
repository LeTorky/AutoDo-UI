import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface ImageUploadProps {}

const UploadBox: FC<ImageUploadProps> = () => {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    try {
      const response = await axios.post(`${process.env.REACT_APP_CORE_DOMAIN}Task/Image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data); // Handle the server response
    } catch (error) {
      console.error('Error uploading image', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag & drop an image here, or click to select one</p>
    </div>
  );
};

export default UploadBox;

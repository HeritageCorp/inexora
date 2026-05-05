import React, { useState } from 'react';
import { z } from 'zod';
import { storage } from '../../lib/firebase'; // Adjust the import based on your firebase.ts file
import { v4 as uuidv4 } from 'uuid';

const PostComposer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fileSchema = z.array(z.instanceof(File)).max(5, 'You can upload up to 5 images.');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      const validation = fileSchema.safeParse(fileArray);
      if (validation.success) {
        setFiles(fileArray);
        setProgress(new Array(fileArray.length).fill(0));
        setError(null);
      } else {
        setError(validation.error.errors[0].message);
      }
    }
  };

  const uploadFiles = async () => {
    const uploadPromises = files.map((file, index) => {
      const storageRef = storage.ref(`uploads/${uuidv4()}_${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress((prev) => {
            const newProgress = [...prev];
            newProgress[index] = percent;
            return newProgress;
          });
        },
        (error) => {
          setError('Upload failed. Please try again.');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );

      return uploadTask;
    });

    await Promise.all(uploadPromises);
  };

  return (
    <div className="post-composer">
      <input type="file" multiple onChange={handleFileChange} />
      {error && <p className="error">{error}</p>}
      <button onClick={uploadFiles} disabled={files.length === 0}>
        Upload
      </button>
      <div className="progress-bar">
        {progress.map((percent, index) => (
          <div key={index} className="progress" style={{ width: `${percent}%` }} />
        ))}
      </div>
    </div>
  );
};

export default PostComposer;
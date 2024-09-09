// src/components/AdminInterface.jsx
import React, { useState, useEffect } from 'react';
import { storage } from '../firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AdminInterface = () => {
  const [folderPath, setFolderPath] = useState('');
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User is authenticated:', currentUser.email);
        setUser(currentUser);
      } else {
        console.error('User is not authenticated');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFetchFiles = async () => {
    if (!user) {
      alert('You need to be logged in to fetch files.');
      return;
    }

    if (!folderPath) {
      alert("Please enter a folder path.");
      return;
    }

    try {
      console.log("Fetching files from folder:", folderPath);
      const folderRef = ref(storage, folderPath);
      const fileList = await listAll(folderRef);

      const fileUrls = await Promise.all(
        fileList.items.map(async (fileRef) => {
          const url = await getDownloadURL(fileRef);
          return { name: fileRef.name, url };
        })
      );

      setFiles(fileUrls);
    } catch (error) {
      console.error('Error fetching files from Firebase Storage:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Interface - Fetch Documents</h2>
      {user ? (
        <>
          {/* Input for Folder Path */}
          <div style={{ marginBottom: '20px' }}>
            <label>
              Enter Folder Path: 
              <input
                type="text"
                value={folderPath}
                onChange={(e) => setFolderPath(e.target.value)}
                placeholder="Enter the folder ID or path"
                style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
              />
            </label>
            <button onClick={handleFetchFiles} style={{ marginLeft: '10px', padding: '5px' }}>
              Fetch Files
            </button>
          </div>

          {/* Display Fetched Files */}
          <h3>Files in Folder: {folderPath}</h3>
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please log in to access this interface.</p>
      )}
    </div>
  );
};

export default AdminInterface;

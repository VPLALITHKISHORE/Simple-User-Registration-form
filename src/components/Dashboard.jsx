// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, listAll } from 'firebase/storage';

const Dashboard = () => {
  const [folderCount, setFolderCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        // Reference to the "files/" folder in Firebase Storage
        const filesFolderRef = ref(storage, 'files/');
        const result = await listAll(filesFolderRef);

        // Count the number of folders and files inside "files/"
        const folders = result.prefixes.length;  // Subfolders in "files/"
        const files = result.items.length;  // Files directly in "files/"

        setFolderCount(folders);
        setFileCount(files);
      } catch (error) {
        console.error('Error fetching storage data:', error);
      }
    };

    fetchStorageData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <p>Total Number of Application Recieved : {folderCount}</p>
      <p>Total Number of Approved Application: {fileCount}</p>
    </div>
  );
};

export default Dashboard;

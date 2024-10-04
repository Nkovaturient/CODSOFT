import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleDriveIntegration = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.readonly",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      listFiles(); // Call the function to list files after login
    });
  };

  const listFiles = () => {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, mimeType)",
      })
      .then((response) => {
        console.log("Files:", response.result.files);
      });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login to Google Drive</button>
    </div>
  );
};

export default GoogleDriveIntegration;

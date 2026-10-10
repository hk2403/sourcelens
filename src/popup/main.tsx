import React from 'react';
import ReactDOM from 'react-dom/client';

function Popup() {
  return (
    <div>
      <h1>SourceLens</h1>
      <p>Frontend UI inspector</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
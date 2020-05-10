import React from 'react';
import Table from './components/Table';
import ErrorBoundry from './components/ErrorBoundary';

function App() {
  return (
    <div className="App col-lg-6">
      <ErrorBoundry>
        <Table/>
      </ErrorBoundry>
    </div>
  );
}

export default App;

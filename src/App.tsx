import React from 'react';
import Table1 from './components/table/Table1';
import data from './mock/DATA.json';
import { UserData, prepearUsers } from './components/user/User';

const App: React.FC = () => {
  const preparedData: UserData[] = prepearUsers({ data });

  return (
    <>
      <Table1 data={preparedData} />
    </>
  );
};

export default App;

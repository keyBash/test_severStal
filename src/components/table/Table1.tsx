import React, { useEffect, useState } from 'react';
import ScrollToTopButton from '../../ui-btn/topScrollBtn';
import { filterName } from '../../filter/filter';

interface UserData {
  id: number;
  name: string;
  balance: string;
  parentId?: number;
  email: string;
  children?: UserData[];
}

interface TableProps {
  data: UserData[];
}

const Table1: React.FC<TableProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<UserData[]>(data);
  const [search, setSearch] = useState<string>('');
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredName = filterName(data, search);
      setSortedData(filteredName as UserData[]);
    }, 300);
    return () => clearTimeout(debounce);
  }, [search, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortBalance = () => {
    const sorted = [...sortedData].sort((a, b) =>
      a.balance.localeCompare(b.balance, undefined, { numeric: true }),
    );
    setSortedData(sorted);
  };

  const renderSubordinate = (parentId: number) => {
    setSelectedParentId((prevParentId) => (prevParentId === parentId ? null : parentId));
  };

  const renderData = (data: UserData[]) => {
    return data.map((item) => (
      <React.Fragment key={item.id + item.email}>
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.balance}</td>
          <td>
            {item.parentId !== undefined ? (
              <button onClick={() => renderSubordinate(item.id)}>Show</button>
            ) : null}
          </td>
        </tr>
        {selectedParentId === item.id && item.children && item.children.length > 0 && (
          <tr>
            <td colSpan={3}>
              <table>
                <tbody>
                  {renderData(sortedData.filter((child) => child.parentId === item.id))}
                </tbody>
              </table>
              <table>
                <tbody>{renderData(item.children)}</tbody>
              </table>
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="app">
      <input className="input" type="text" placeholder="ФИО..." onChange={handleSearch} />
      <ScrollToTopButton />

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th onClick={handleSortBalance}>Balance</th>
            <th>Subordinate</th>
          </tr>
        </thead>
        <tbody>{renderData(sortedData)}</tbody>
      </table>
    </div>
  );
};

export default Table1;

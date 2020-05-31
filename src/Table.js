import React from 'react';
import './Table.css';

const table = ({ rowData }) => {
  return (
    <table className="users">
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Submissions</th>
      </tr>
      {rowData.map(item => {
        return (
          <tr>
            <td>
              <a href={item?.url}>{item?.title ? item?.title : 'Not Found'}</a>
            </td>
            <td>{item?.author}</td>
            <td>{item.submission_count}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default table;

// @ts-nocheck
import React, { useState, useEffect } from 'react';

// services
import usersService from '../services/users';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

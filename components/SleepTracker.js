import { useState, useEffect } from 'react';
import UserSleepCard from './UserSleepCard';
import AddSleepRecord from './AddSleepRecord';

export default function SleepTracker() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Harish', records: [] },
    { id: 2, name: 'Govardhan', records: [] }
  ]);
  
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('sleepData');
    if (savedData) {
      setUsers(JSON.parse(savedData));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('sleepData', JSON.stringify(users));
  }, [users]);

  const addSleepRecord = (userId, sleepTime, wakeupTime, date) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          records: [...user.records, { id: Date.now(), sleepTime, wakeupTime, date }]
        };
      }
      return user;
    }));
    setSelectedUser(null);
  };

  const deleteSleepRecord = (userId, recordId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          records: user.records.filter(record => record.id !== recordId)
        };
      }
      return user;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {selectedUser ? (
        <AddSleepRecord 
          user={users.find(u => u.id === selectedUser)} 
          onSubmit={addSleepRecord}
          onCancel={() => setSelectedUser(null)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map(user => (
            <UserSleepCard 
              key={user.id}
              user={user}
              onAddClick={() => setSelectedUser(user.id)}
              onDeleteRecord={(recordId) => deleteSleepRecord(user.id, recordId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}


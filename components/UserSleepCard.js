import { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';

export default function UserSleepCard({ user, onAddClick, onDeleteRecord }) {
  const [showAllRecords, setShowAllRecords] = useState(false);
  
  const sortedRecords = [...user.records].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  const displayRecords = showAllRecords ? sortedRecords : sortedRecords.slice(0, 3);
  
  const calculateDuration = (sleepTime, wakeupTime) => {
    const [sleepHour, sleepMinute] = sleepTime.split(':').map(Number);
    let [wakeHour, wakeMinute] = wakeupTime.split(':').map(Number);
    
    let hours = wakeHour - sleepHour;
    let minutes = wakeMinute - sleepMinute;
    
    if (hours < 0) hours += 24;
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200">
      <div className="bg-indigo-500 dark:bg-indigo-700 p-4 text-white flex justify-between items-center">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <button 
          onClick={onAddClick}
          className="p-1 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
          aria-label="Add sleep record"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="p-4">
        {displayRecords.length > 0 ? (
          <>
            <ul className="space-y-4">
              {displayRecords.map(record => (
                <li 
                  key={record.id} 
                  className="bg-blue-100 p-3 rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">{record.date}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex items-center">
                        <span className="text-sm">{record.sleepTime}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">{record.wakeupTime}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">
                          {calculateDuration(record.sleepTime, record.wakeupTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onDeleteRecord(record.id)}
                    className="text-gray-500 hover:text-red-500"
                    aria-label="Delete record"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>

            {user.records.length > 3 && (
              <button
                onClick={() => setShowAllRecords(!showAllRecords)}
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
              >
                {showAllRecords ? 'Show less' : `Show all (${user.records.length})`}
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No sleep records yet</p>
            <button 
              onClick={onAddClick}
              className="mt-2 text-indigo-600 hover:text-indigo-800"
            >
              Add first record
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


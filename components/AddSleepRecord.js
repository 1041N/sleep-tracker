import { useState } from 'react';

export default function AddSleepRecord({ user, onSubmit, onCancel }) {
  const [sleepTime, setSleepTime] = useState('22:00');
  const [wakeupTime, setWakeupTime] = useState('07:00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user.id, sleepTime, wakeupTime, date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Add Sleep Record for {user.name}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="sleepTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sleep Time
          </label>
          <input
            type="time"
            id="sleepTime"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="wakeupTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Wake-up Time
          </label>
          <input
            type="time"
            id="wakeupTime"
            value={wakeupTime}
            onChange={(e) => setWakeupTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}


import React, { useState } from 'react';

export default function HebrewPuzzleTool() {
  const [knownPattern, setKnownPattern] = useState('');
  const [numWords, setNumWords] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:8080/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ knownPattern, numWords }),
      });
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-md text-right" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">כלי לפתרון חידות לוגיות בעברית</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium">הכנס דפוס ידוע (השתמש ב- _ לאותיות חסרות):</label>
        <input
          type="text"
          value={knownPattern}
          onChange={(e) => setKnownPattern(e.target.value)}
          className="w-full p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">מספר מילים (אופציונלי):</label>
        <input
          type="number"
          value={numWords}
          onChange={(e) => setNumWords(e.target.value)}
          className="w-full p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
      >
        חפש
      </button>

      <div className="mt-6">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index} className="border-b py-2">
              <h2 className="font-bold">{item.title}</h2>
              <p>{item.snippet}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">לינק</a>
            </div>
          ))
        ) : (
          <p>אין תוצאות להצגה.</p>
        )}
      </div>
    </div>
  );
}

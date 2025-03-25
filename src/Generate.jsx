import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Generate = () => {
  const [name, setName] = useState('');
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [link, setLink] = useState('');

  const generateLink = () => {
    if (!name.trim()) {
      alert('Please enter a valid name.');
      return;
    }
    setLink(`https://birthday-wisher.netlify.app/birthday/${name}/${day}/${month}`);
  };

  return (
    <div className="page">
      <h1>Generate Here</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Day"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          max={31}
          min={1}
        />
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {[
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
          ].map((m, index) => (
            <option key={index} value={index + 1}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <button className="btn" onClick={generateLink}>
        Generate Link
      </button>

      {link && (
        <>
          <p className="gen-link">{link}</p>
          <Link to={`/birthday/${name}/${day}/${month}`}>
            <button className="btn">Visit Link</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Generate;

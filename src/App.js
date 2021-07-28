import React, { useState, useEffect } from 'react';

let testRecords = [
  {
    topic: 'computers',
    timestamp: '2021-07-28T17:02:53.252Z',
    key: 'inventory',
    value: '27'
  },
  {
    topic: 'phones',
    timestamp: '2021-07-28T17:02:54.252Z',
    key: 'inventory',
    value: '100'
  }
]

const id = Date.now()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5MmtycjA1YXJwdG9jZjVqYm1heCIsImV4cCI6MTYyNzUxMjgzMiwiaWF0IjoxNjI3NTEyMjMyfQ.wbz_fehosDermKL4YoNmQjI-UbXps2n_H96igjJ1bNA'

const URL = `http://localhost/stream/all`
const streamURL = `${URL}/${id}/${token}`

const Header = ({text}) => <h1>{text}</h1>;



const RecordTable = ({title}) => {
  const [records, setRecords] = useState([])

  useEffect( () => {
    const getRealTimeData = event => {
      let record = JSON.parse(event.data);
      setRecords([record, ...records]);
    }

    const events = new EventSource(streamURL);
    events.onmessage = (event) => getRealTimeData(event);

    return () => {
      events.close();
    };

  }, [records]);

  return (
    <>
    <h3>{title}</h3>
    <table id="records">
    <thead>
      <tr>
        <th>Topic</th>
        <th>Timestamp</th>
        <th>Key</th>
        <th>Value</th>
      </tr>
    </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.timestamp}>
            <td>{record.topic}</td>
            <td>{record.timestamp}</td>
            <td>{record.key}</td>
            <td>{record.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )}

function App() {
  return (
    <div className="App">
      <Header text="Hello Employees" />
      <RecordTable title={"Products"} />
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => {
        console.log(response.data);
        setDiaries(response.data);
      })
      .catch(error => {
        console.error('Error fetching diaries:', error);
      });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    };
    axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newDiaryEntry)
      .then(response => {
        setDiaries(diaries.concat(response.data));
      })
      .catch(error => {
        console.error('Error creating diary:', error);
      });

    setNewDate('');
    setNewWeather('');
    setNewVisibility('');
    setNewComment('');
  };

  return (
    <div>
      <form onSubmit={diaryCreation}>
      <h3>Add a new entry</h3>
        <div>
          <label>date</label>
          <input
            type="text"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)} 
          />
        </div>
        <div>
          <label>visibility</label>
          <input
            type="text"
            value={newVisibility}
            onChange={(event) => setNewVisibility(event.target.value)}
          />
        </div>
        <div>
          <label>weather</label>
          <input
            type="text"
            value={newWeather}
            onChange={(event) => setNewWeather(event.target.value)}
          />
        </div>
        <div>
          <label>comment</label>
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
      <h3>Diary entires</h3>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
            <strong>{diary.date}</strong> 
            <br />Weather: {diary.weather}
            <br />Visibility: {diary.visibility}
            <br />Comment: {diary.comment}
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;

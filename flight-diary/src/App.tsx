import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Great);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string | null>(null);

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
        setError(null);  // Clear error message on successful creation
      })
      .catch(error => {
        console.error('Error creating diary:', error);
        if (error.response && error.response.data) {
          setError(`Error creating diary entry: ${error.response.data}`);
        } else {
          setError('Error creating diary entry.');
        }
      });

    setNewDate('');
    setNewWeather(Weather.Sunny);
    setNewVisibility(Visibility.Great);
    setNewComment('');
  };

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <h3>Add new entry</h3>
        <div>
          <label>date</label>
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)} 
          />
        </div>
        <div>
          <label>weather</label>
          <div>
            <label>
              <input
                type="radio"
                value={Weather.Sunny}
                checked={newWeather === Weather.Sunny}
                onChange={() => setNewWeather(Weather.Sunny)}
              />
              Sunny
            </label>
            <label>
              <input
                type="radio"
                value={Weather.Rainy}
                checked={newWeather === Weather.Rainy}
                onChange={() => setNewWeather(Weather.Rainy)}
              />
              Rainy
            </label>
            <label>
              <input
                type="radio"
                value={Weather.Cloudy}
                checked={newWeather === Weather.Cloudy}
                onChange={() => setNewWeather(Weather.Cloudy)}
              />
              Cloudy
            </label>
            <label>
              <input
                type="radio"
                value={Weather.Stormy}
                checked={newWeather === Weather.Stormy}
                onChange={() => setNewWeather(Weather.Stormy)}
              />
              Stormy
            </label>
            <label>
              <input
                type="radio"
                value={Weather.Windy}
                checked={newWeather === Weather.Windy}
                onChange={() => setNewWeather(Weather.Windy)}
              />
              Windy
            </label>
          </div>
        </div>
        <div>
          <label>visibility</label>
          <div>
            <label>
              <input
                type="radio"
                value={Visibility.Great}
                checked={newVisibility === Visibility.Great}
                onChange={() => setNewVisibility(Visibility.Great)}
              />
              Great
            </label>
            <label>
              <input
                type="radio"
                value={Visibility.Good}
                checked={newVisibility === Visibility.Good}
                onChange={() => setNewVisibility(Visibility.Good)}
              />
              Good
            </label>
            <label>
              <input
                type="radio"
                value={Visibility.Ok}
                checked={newVisibility === Visibility.Ok}
                onChange={() => setNewVisibility(Visibility.Ok)}
              />
              Ok
            </label>
            <label>
              <input
                type="radio"
                value={Visibility.Poor}
                checked={newVisibility === Visibility.Poor}
                onChange={() => setNewVisibility(Visibility.Poor)}
              />
              Poor
            </label>
          </div>
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Diary entries</h3>
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

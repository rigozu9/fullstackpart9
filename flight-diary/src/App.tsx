import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  // const [newDiary, setNewDiary] = useState('');

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
    .then(response => {
      console.log(response.data);
      setDiaries(response.data);
    })
    .catch(error => {
      console.error('Error fetching diaries:', error);
    });
  }, [])

  // const diaryCreation = (event: React.SyntheticEvent) => {
  //   event.preventDefault()
  //   const diaryToAdd = {
  //     content: newDiary,
  //     id: diaries.length + 1
  //   }
  //   setDiaries(diaries.concat(diaryToAdd));
  //   setNewDiary('')
  // };

  return (
    <div>
      {/* <form onSubmit={diaryCreation}>
        <input
          value={newDiary}
          onChange={(event) => setNewDiary(event.target.value)} 
        />
        <button type='submit'>add</button>
      </form> */}
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
            {diary.date} - {diary.weather} - {diary.visibility}
            <br />
            Comment: {diary.comment}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
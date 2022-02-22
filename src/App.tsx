import './styles/content.scss';
import './styles/global.scss';
import './styles/sidebar.scss';

import { useEffect, useState } from 'react';

import Content from './components/Content';
import Sidebar from './components/SideBar';
import { api } from './services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Sidebar handleClickButton={handleClickButton} selectedGenreId={selectedGenreId}  />
      <Content selectedGenre={selectedGenre} selectedGenreId={selectedGenreId} />
    </div>
  )
}
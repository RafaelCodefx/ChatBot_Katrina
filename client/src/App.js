import React, { useState } from 'react';
import './App.css'
import katrina from './assets/katrina.jpeg'

function App() {
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('');

  const fetchGeneratedText = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da rede');
      }

      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error('Houve um problema com a solicitação:', error);
    }
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="app">
      <p className="author">Desenvolvido por Rafael H. J. Batista</p>
      <div className='global'>
      <div className="ia">
        <img src={katrina} alt='IA'/>
        <h1>Katrina ☺️</h1>
      </div>
      <p className="text">{text}</p>
      <div className="entrada">
        <input 
          placeholder='Digite algo!' 
          value={prompt}
          onChange={handleInputChange}
          className='input'
        />
        <button onClick={fetchGeneratedText} className='button'>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

function App() {
  // Individual states for each input
  const [distinctInput, setDistinctInput] = useState('');
  const [largeNumbersInput, setLargeNumbersInput] = useState('');
  const [wordCountInput, setWordCountInput] = useState('');
  const [capitalizeInput, setCapitalizeInput] = useState('');
  const [sumCommaInput, setSumCommaInput] = useState('');
  const [longestWordInput, setLongestWordInput] = useState('');
  const [shuffleInput, setShuffleInput] = useState('');
  const [cipherInput, setCipherInput] = useState('');
  const [shift, setShift] = useState(0);
  const [result, setResult] = useState('');

  // Functions for operations
  const distinctArray = (arr) => [...new Set(arr)];
  const first100PrimesSum = () => {
    const isPrime = (num) => {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };
    
    let primes = [];
    let num = 2;
    while (primes.length < 100) {
      if (isPrime(num)) primes.push(num);
      num++;
    }
    const sum = primes.reduce((sum, prime) => sum + prime, 0);
    return [primes, sum];
  };
  const primeDistances = () => {
    const primes = first100PrimesSum()[0];
    return primes.map((prime, idx) => idx > 0 ? prime - primes[idx - 1] : 0).slice(1);
  };
  const addLargeNumbers = (num1, num2) => {
    let result = '';
    let carry = 0;
    let i = num1.length - 1;
    let j = num2.length - 1;

    while (i >= 0 || j >= 0 || carry) {
      const digit1 = i >= 0 ? +num1[i] : 0;
      const digit2 = j >= 0 ? +num2[j] : 0;
      let sum = digit1 + digit2 + carry;
      carry = Math.floor(sum / 10);
      result = (sum % 10) + result;
      i--;
      j--;
    }

    return result;
  };
  const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;
  const capitalizeWords = (text) => text.replace(/\b\w/g, (char) => char.toUpperCase());
  const sumCommaDelimited = (str) => str.split(',').reduce((sum, num) => sum + parseFloat(num), 0);
  const longestWord = (str) => str.split(/\s+/).reduce((longest, word) => word.length > longest.length ? word : longest, '');
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const caesarCipher = (str, shift) => {
    return str.replace(/[a-zA-Z]/g, char => {
      const base = char.charCodeAt(0) < 97 ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    });
  };

  // UI Section
  return (
    <div className="App">
      <h1>JavaScript Function Utilities</h1>

      {/* Distinct Array */}
      <div className="section">
        <h3>Distinct Array</h3>
        <input type="text" value={distinctInput} onChange={(e) => setDistinctInput(e.target.value)} placeholder="Enter numbers separated by commas" />
        <button onClick={() => setResult(JSON.stringify(distinctArray(distinctInput.split(',').map(Number))))}>Get Distinct Array</button>
      </div>

      {/* Prime Sum */}
      <div className="section">
        <h3>First 100 Prime Numbers Sum</h3>
        <button onClick={() => setResult(JSON.stringify(first100PrimesSum()))}>Calculate Prime Sum</button>
      </div>

      {/* Prime Distances */}
      <div className="section">
        <h3>Prime Distances</h3>
        <button onClick={() => setResult(JSON.stringify(primeDistances()))}>Print Prime Distances</button>
      </div>

      {/* Add Large Numbers */}
      <div className="section">
        <h3>Add Large Numbers</h3>
        <input type="text" value={largeNumbersInput} onChange={(e) => setLargeNumbersInput(e.target.value)} placeholder="Enter two numbers separated by comma" />
        <button onClick={() => {
          const [num1, num2] = largeNumbersInput.split(',').map(n => n.trim());
          setResult(addLargeNumbers(num1, num2));
        }}>Add Large Numbers</button>
      </div>

      {/* Word Count */}
      <div className="section">
        <h3>Word Count</h3>
        <input type="text" value={wordCountInput} onChange={(e) => setWordCountInput(e.target.value)} placeholder="Enter text" />
        <button onClick={() => setResult(wordCount(wordCountInput))}>Count Words</button>
      </div>

      {/* Capitalize Words */}
      <div className="section">
        <h3>Capitalize Words</h3>
        <input type="text" value={capitalizeInput} onChange={(e) => setCapitalizeInput(e.target.value)} placeholder="Enter text" />
        <button onClick={() => setResult(capitalizeWords(capitalizeInput))}>Capitalize Words</button>
      </div>

      {/* Sum Comma Delimited */}
      <div className="section">
        <h3>Sum Comma Delimited</h3>
        <input type="text" value={sumCommaInput} onChange={(e) => setSumCommaInput(e.target.value)} placeholder="Enter comma separated numbers" />
        <button onClick={() => setResult(sumCommaDelimited(sumCommaInput))}>Calculate Sum</button>
      </div>

      {/* Longest Word */}
      <div className="section">
        <h3>Longest Word</h3>
        <input type="text" value={longestWordInput} onChange={(e) => setLongestWordInput(e.target.value)} placeholder="Enter text" />
        <button onClick={() => setResult(longestWord(longestWordInput))}>Find Longest Word</button>
      </div>

      {/* Shuffle Array */}
      <div className="section">
        <h3>Shuffle Array</h3>
        <input type="text" value={shuffleInput} onChange={(e) => setShuffleInput(e.target.value)} placeholder="Enter numbers separated by commas" />
        <button onClick={() => setResult(JSON.stringify(shuffleArray(shuffleInput.split(',').map(Number))))}>Shuffle Array</button>
      </div>

      {/* Caesar Cipher */}
      <div className="section">
        <h3>Caesar Cipher</h3>
        <input type="text" value={cipherInput} onChange={(e) => setCipherInput(e.target.value)} placeholder="Enter text" />
        <input type="number" value={shift} onChange={(e) => setShift(parseInt(e.target.value))} placeholder="Shift" />
        <button onClick={() => setResult(caesarCipher(cipherInput, shift))}>Encrypt Text</button>
      </div>

      {/* Result Display */}
      <div className="result-section">
        <h3>Result</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default App;

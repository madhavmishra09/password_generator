import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}:[]<>?/.,~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])
  const copyPasswordToClipboard=useCallback(()=> {
    passwordRef.current?.select();
    passwordGenerator.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password);
  },[password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
  <div className="w-full max-w-md mx-auto rounded-2xl shadow-lg p-6 bg-white/10 backdrop-blur-lg border border-white/20">
    <h1 className="text-3xl font-bold text-center text-white mb-6">Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input 
        type="text" 
        value={password} 
        className="outline-none w-full py-2 px-3 bg-black/70 text-green-400 font-mono tracking-wide rounded-l-lg" 
        placeholder="password" 
        readOnly 
        ref={passwordRef}
      />
      <button 
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold transition rounded-r-lg"
        onClick={copyPasswordToClipboard}
      >
        Copy
      </button>
    </div>
    <div className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-1">Length: <span className="text-white font-bold">{length}</span></label>
        <input 
          type="range" 
          min={6} max={32} value={length}
          className="w-full cursor-pointer accent-pink-500"
          onChange={(e) => setLength(e.target.value)} 
        />
      </div>
      <div className="flex justify-between">
        <label className="flex items-center gap-2 text-gray-300">
          <input 
            type="checkbox" 
            checked={numberAllowed} 
            onChange={() => setNumberAllowed(prev => !prev)} 
            className="accent-pink-500"
          />
          Numbers
        </label>

        <label className="flex items-center gap-2 text-gray-300">
          <input 
            type="checkbox" 
            checked={charAllowed} 
            onChange={() => setCharAllowed(prev => !prev)} 
            className="accent-pink-500"
          />
          Symbols
        </label>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default App

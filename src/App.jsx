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
  const getStrength=(password) => {
    let strength=0;
    if(password.length>=8)
    {
      strength++;
    }
    if(/[A-Z]/.test(password))
    {
      strength++;
    }
    if(/[0-9]/.test(password))
    {
      strength++;
    }
    if(/[^A-Za-z0-9]/.test(password))
    {
      strength++;
    }
    return strength;
  }
  const [strength,setStrength]=useState(0);
  useEffect(()=>{
    setStrength(getStrength(password));
  },[password]);
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-white bg-gray-800'>
        <h1 className='text-3xl font-bold text-center text-white mb-6'>Password Generator</h1>
        
        {/* Password Box */}
        <div className='flex shadow rounded-lg overflow-hidden mb-2'>
          <input 
            type="text" 
            value={password} 
            className='outline-none w-full py-2 px-3 bg-white text-black font-mono tracking-wide' 
            placeholder='password' 
            readOnly 
            ref={passwordRef}
          />
          <button 
            className='bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold transition' 
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        {/* Strength Bar */}
        <div className="mb-4">
          <div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`h-2 transition-all duration-300 ${
                strength === 0 ? "w-0" :
                strength === 1 ? "w-1/4 bg-red-500" :
                strength === 2 ? "w-2/4 bg-yellow-500" :
                strength === 3 ? "w-3/4 bg-blue-500" :
                "w-full bg-green-500"
              }`}
            ></div>
          </div>
          <p className="text-sm mt-1 text-gray-300">
            {strength === 0 && "Too Weak"}
            {strength === 1 && "Weak"}
            {strength === 2 && "Moderate"}
            {strength === 3 && "Strong"}
            {strength === 4 && "Very Strong"}
          </p>
        </div>

        {/* Controls */}
        <div className='flex flex-col gap-4 text-sm'>
          {/* Length Slider */}
          <div className='flex items-center gap-x-2'>
            <input 
              type="range" 
              min={6} 
              max={32} 
              value={length} 
              className='cursor-pointer w-full accent-pink-500' 
              onChange={(e) => setLength(e.target.value)} 
            />
            <label className="text-gray-200">Length: <span className="font-bold">{length}</span></label>
          </div>

          {/* Numbers Option */}
          <label className='flex items-center gap-x-2 text-gray-200'>
            <input 
              type="checkbox" 
              checked={numberAllowed} 
              onChange={() => setNumberAllowed(prev => !prev)} 
              className="accent-pink-500"
            />
            Include Numbers
          </label>

          {/* Symbols Option */}
          <label className='flex items-center gap-x-2 text-gray-200'>
            <input 
              type="checkbox" 
              checked={charAllowed} 
              onChange={() => setCharAllowed(prev => !prev)} 
              className="accent-pink-500"
            />
            Include Symbols
          </label>
        </div>
      </div>
    </>
  )
}

export default App

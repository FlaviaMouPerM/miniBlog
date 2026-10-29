import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const {login, error: authError, loading} = useAuthentication()
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
  
    setError("")

    const user = {
      email,
      password,
    }
    
    const res = await login(user)
     console.log(res)
     
  }
  useEffect(()=>{
  
    if(authError){
      setError(authError)
    }
  
  }, [authError])
  return (
    <div>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Log in to Mini Blog
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            E-mail:
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Password:
          </span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </label>

        {!loading && <button type="submit"
          value="Register"
          className="w-full mt-3 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200">Log in</button>
        }
        {loading && <button type="submit"
          value="Register"
          disabled
          className="w-full mt-3 py-3 px-4 bg-gray-300 text-white font-semibold rounded-lg cursor-none">Loading . . .</button>
        }
        {error && <p className="bg-red-100 text-center text-red-900 rounded-sm">{error}</p> }

      </form>
    </div>
  )
}

export default Login
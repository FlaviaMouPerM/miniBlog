
import { useState, useEffect  } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { AuthErrorCodes } from "firebase/auth";

const Register = () => {

  const [displayName, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {createUser, error: authError, loading} = useAuthentication()

const handleSubmit = async (e) =>{
  e.preventDefault()

  setError("")


  if(password !== confirmPassword){
    setError("As senhas precisam ser iguais!")
    return
  }

  const user = {
    displayName,
    email,
    password,
  }
  
  const res = await createUser(user)
   console.log(res)
   if (res) {
    console.log("Utilizador criado com sucesso:", res);
  }
}
useEffect(()=>{

  if(authError){
    setError(authError)
  }

}, [authError])

  return (
    <div className="w-full max-w-md mx-auto my-12 px-6 py-8 bg-white rounded-xl shadow-lg">

      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Cadastre-se para postar
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Name:
          </span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={displayName}
            onChange={(e) =>  setDisplayname(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </label>

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

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Confirm Password:
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </label>

        {!loading && <button type="submit"
          value="Register"
          className="w-full mt-3 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200">Sign Up</button>
        }
        {loading && <button type="submit"
          value="Register"
          disabled
          className="w-full mt-3 py-3 px-4 bg-gray-300 text-white font-semibold rounded-lg cursor-none">Loading . . .</button>
        }
        {error && <p className="bg-red-100 text-center text-red-900 rounded-sm">{error}</p> }

      </form>
    </div>
  );
};

export default Register;

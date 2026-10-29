
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

const Home = () => {
  const [query, setQuery] = useState("")
  const [posts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          qualquer coisa aqui
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <input
            type="text"
            placeholder="Busque por tags"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />

          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Pequisar
          </button>
        </form>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Post
          </h1>

          {posts && posts.length === 0 && (
            <div className="p-8 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
              <p className="text-gray-500 mb-4">
                Nao foram encontrados posts
              </p>

              <Link
                to="post/create"
                className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Criar post
              </Link>
            </div>
          )}
        </div>

      </div>
    </>
  )
}
export default Home;
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("post");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);

    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    const tagsArray = tags.split(",").map((tag)=>tag.trim().toLocaleLowerCase())

    if(!title || !image || !tags || !body){
      setFormError("Por favor,preencha todos os campos!")
    }

    if (formError) return;

    //console.log("entrei aqui");
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createBy: user.displayName,
      
    });
    navigate("/")
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 px-6 py-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Criar Post</h2>

      <p className="text-gray-500 mb-8">
        Escreva sobre o que quiser, compartilhe suas ideias!
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">Título:</span>

          <input
            type="text"
            name="title"
            required
            placeholder="Escreva o título do seu post..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">
            URL da imagem:
          </span>

          <input
            type="url"
            name="image"
            required
            placeholder="Insira o endereço da imagem..."
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">Conteúdo:</span>

          <textarea
            name="body"
            required
            placeholder="Escreva o conteúdo do seu post..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
            rows={7}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-y"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">Tags:</span>

          <input
            type="text"
            name="tags"
            required
            placeholder="Ex.: programação, tecnologia, React"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />

          <span className="text-xs text-gray-400">
            Separe as tags por vírgulas.
          </span>
        </label>

        {formError && (
          <p className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {formError}
          </p>
        )}

        {!response.loading && (
          <button
            type="submit"
            value="Register"
            className="w-full mt-3 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200"
          >
            Create Post
          </button>
        )}
        {response.loading && (
          <button
            type="submit"
            value="Register"
            disabled
            className="w-full mt-3 py-3 px-4 bg-gray-300 text-white font-semibold rounded-lg cursor-none"
          >
            Loading . . .
          </button>
        )}
        {response.error && (
          <p className="bg-red-100 text-center text-red-900 rounded-sm">
            {response.error}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;

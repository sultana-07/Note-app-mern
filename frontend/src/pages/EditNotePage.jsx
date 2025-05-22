import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const EditNotePage = () => {
  // ... existing state declarations ...
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({
      title: '',
      content: '',
      category: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    const categories = ['personal', 'work', 'study', 'other'];
  
    useEffect(() => {
      fetchNote();
    }, [id]);
  
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
  
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/note/get/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNote(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch note');
        setLoading(false);
      }
    };
  
    const handleChange = (e) => {
      setNote({
        ...note,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
  
        const updatedNote =   await axios.put(
          `${import.meta.env.VITE_BASEURL}/note/update/${id}`,
          note,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log("this is the updated note", updatedNote.data);
        
        setNote(updatedNote);
  
        navigate('/note');
      } catch (err) {
        setError('Failed to update note');
      }
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Edit Note
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/note')}
              className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center gap-2"
            >
              <span>←</span> Back to Notes
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md mb-4"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white backdrop-blur-lg bg-opacity-90 shadow-xl rounded-lg p-2"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                id="title"
                name="title"
                value={note.title}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                          focus:border-indigo-500 focus:ring-0 transition-all duration-300
                          bg-gray-50 focus:bg-white text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <select
                  id="category"
                  name="category"
                  value={note.category}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                          focus:border-indigo-500 focus:ring-0 transition-all duration-300
                          bg-gray-50 focus:bg-white text-gray-900 appearance-none"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="capitalize">
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
                </div>
              </motion.div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                id="content"
                name="content"
                rows="8"
                value={note.content}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                          focus:border-indigo-500 focus:ring-0 transition-all duration-300
                          bg-gray-50 focus:bg-white text-gray-900 resize-none"
                required
              ></motion.textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate('/note')}
                className="px-6 py-3 rounded-lg text-sm font-medium text-gray-700 
                        bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 rounded-lg text-sm font-medium text-white 
                        bg-gradient-to-r from-indigo-600 to-purple-600 
                        hover:from-indigo-700 hover:to-purple-700 
                        shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EditNotePage;
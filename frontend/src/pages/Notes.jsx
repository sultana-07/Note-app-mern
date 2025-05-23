import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import SideBar from '../component/SideBar';

const Notes = () => {
  // ...existing state declarations...
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '', category: '' });
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
   
    const navigate = useNavigate();
  
    const categories = ['personal', 'work', 'study', 'other'];
  
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
      

  
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/note/getall`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNotes(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    // delete note message
    useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
        setDeleteMessage('');
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);
  
    useEffect(() => {
      fetchNotes();
    }, []);
  
    const deleteNote = async (noteId) => {
      setIsDeleting(true);
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login');
            return;
          }

            const singleNote = await axios.get(`${import.meta.env.VITE_BASEURL}/note/get/${noteId}`, {
            headers: {
            'Authorization': `Bearer ${token}`
          }
        });

      
        
        if (singleNote.status !== 200) {
            setError('Error fetching note');
          return;
        }
         const deletenote =  await axios.put(`${import.meta.env.VITE_BASEURL}/note/delete/${noteId}`,  singleNote.data,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (deletenote.status !== 200) {
             alert('Error deleting note');
             return;
          }
          setIsDeleting(false);
  
           setDeleteMessage('Note deleted successfully');
          // Update the notes state to remove the deleted note
          
          setNotes(notes.filter(note => note._id !== noteId));
        }catch (err) {
          setError(err.message);
        }
    }
     
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_BASEURL}/note/add`,
          newNote,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
  
      
        setLoading(false);
        setNotes([response.data ,...notes]);
        setNewNote({ title: '', content: '', category: '' });
        setShowForm(false);
      } catch (err) {
        
        
        setError(err.message);
      }
    };
  
    const filteredNotes = selectedCategory === 'all' 
      ? notes 
      : notes.filter(note => note.category === selectedCategory);
  
    if (loading) return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 z-0"
    >
      {/* Animated Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.h1 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              NotePro
            </motion.h1>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              >
                {showForm ? 'Close' : '✨ Create Note'}
              </motion.button>
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-300"
              >
                Logout
              </motion.button> */}
                   <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-300"
              >
                menu
              </motion.button>
              <AnimatePresence>
                {isSidebarOpen && (
                  <SideBar
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                    handleLogout={handleLogout}
                  />
                )}
              </AnimatePresence>
          

            </div>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
        {/* Animated Category Filter */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full shadow-sm transition-all duration-300 ${
                selectedCategory === 'all' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                  : 'bg-white hover:border-indigo-500 border border-gray-300'
              }`}
            >
              All
            </motion.button>
            {categories.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize shadow-sm transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                    : 'bg-white hover:border-indigo-500 border border-gray-300'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animated Messages */}
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

          {deleteMessage && (
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>{deleteMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Create Note Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white shadow-lg rounded-lg  mb-8"
            >
              {/* ... existing form content ... */}

                {showForm && (
          <div className="bg-white w-full shadow-lg rounded-lg p-6 mb-8 transition-all">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 outline-none p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newNote.category}
                    onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category} className="capitalize">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows="4"
                    className="mt-1 outline-none border-1 block w-full h-52 p-1 rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                 {loading ? 'creating...' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Notes Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <motion.div
                key={note._id}
             
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 uppercase">{note.title}</h3>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full capitalize bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
                    {note.category || 'uncategorized'}
                  </span>
                </div>
                <p 
                   onClick={() => navigate(`/note/${note._id}`)}
                className="text-gray-600 mt-2">{note.content.slice(0,90)}...</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/edit/${note._id}`)}
                    className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900 transition-colors"
                  >
                    Edit
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteNote(note._id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-900 transition-colors"
                  >
                   {isDeleting ? 'Deleting...' : 'Delete'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Notes;
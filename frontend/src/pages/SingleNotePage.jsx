import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'

const SingleNotePage = () => {
    const {id} = useParams()
    const [note, setNote] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const contentRef = React.useRef(null);

    const navigate = useNavigate()

    const handleDelete = async () => {
        
     
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASEURL}/note/delete/${id}`,
                 note,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
            })
              
            
            if (response.status !== 200) {
                setError("Failed to delete note")
            }
            console.log(response.data);
            
            navigate("/note")
        } catch (error) {
            setError(error.response.data.message)
        }
    }

     const handleCopy = async () => {
    try {
      if (contentRef.current) {
      
        await navigator.clipboard.writeText(contentRef.current.innerText);
        setIsCopied(true);
       

        setTimeout(() => {
          setIsCopied(false);
           
        }, 2000);
      }
    } catch (err) {
      setError("Failed to copy note to clipboard");
    }
  };

    const handleEdit =  () => {
        document.getElementById("delete").disabled = true;
        document.getElementById("delete").style.backgroundColor = "gray";
        document.getElementById("copybtn").disabled = true;
        document.getElementById("copybtn").style.backgroundColor = "gray";
        document.getElementById("edit").style.display = "none";
        document.getElementById("save").style.display = "block";
        document.getElementById("contentBox").style.display = "none";
        document.getElementById("input").style.display = "block";
    }

    const handleSave =  () => {
         document.getElementById("delete").disabled = false;
        document.getElementById("delete").style.backgroundColor = "red";
        document.getElementById("copybtn").disabled = false;
        document.getElementById("copybtn").style.backgroundColor = "blue";
        document.getElementById("edit").style.display = "block";
        document.getElementById("save").style.display = "none";
        document.getElementById("contentBox").style.display = "block";
        document.getElementById("input").style.display = "none";

        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }
        const fetchNote = async () => {
            try {
                const response = await axios.put(`${import.meta.env.VITE_BASEURL}/note/update/${id}`, note, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status !== 200) {
                    setError("Failed to update note")
                }
                console.log(response.data);
                
                setNote(response.data)
                setLoading(false)
            } catch (error) {
                setError(error.response.data.message)
                setLoading(false)
            }
        }
        fetchNote()


       
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/note/get/${id}`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status !== 200) {
                    setError("Failed to fetch note")
                }
                console.log(response.data);
                
                setNote(response.data)
                setLoading(false)
            } catch (error) {
                setError(error.response.data.message)
                setLoading(false)
            }
        }
        fetchNote()
    }, [id])
    if (loading) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <h1 className='text-2xl font-bold'>Loading...</h1>
        </div>
    }
   
  return (
    <>
     <div className='w-full h-screen  '> 
        <nav className='w-full h-16 bg-white flex items-center border-b-2 border-b-gray-500 p-2 justify-between'>
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Note App</h1>
            </div>
        </nav>

        <div className='w-full h-16 bg-white flex items-center p-2 justify-between'>
            <ul className='flex px-2 items-center gap-8'>
                <li>
                <button id='copybtn'
                onClick={handleCopy}
                className='bg-blue-400 text-center px-4 py-2 rounded-full text-white font-bold'
                >
                  {isCopied ? "copied" : "copy"}
                </button>
                
              
                </li>

                <li   id='edit'>
                <button
                
                onClick={handleEdit}
                className='bg-green-400 text-center px-4 py-2 rounded-full text-white font-bold'
                >
                    Edit
                </button>
                </li>
                  
               
                <li  id='save'  className='hidden'>
                <button
                 
                onClick={handleSave}
                className='bg-green-400 text-center px-4 py-2 rounded-full text-white font-bold'
                >
                    Save
                </button>
                </li>

                <li >
                  <button 
                  id='delete'
                    onClick={handleDelete}
                     className='bg-red-400 text-center px-4 py-2 rounded-full text-white font-bold'
                  >
                    Delete
                    </button>  
                
                  </li>
            </ul>
        </div>
 
         {/* this is for error */}
          <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md mb-4"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* this is for copy text */}
           <AnimatePresence>
          {isCopied && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-600 border text-center border-green-400 text-white px-4 py-3 rounded-lg shadow-md mb-4"
            >
                Copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
          

        <div className='w-full p-2 mt-3 flex justify-between border-b-2 border-gray-400'>
            <h2 className='text-2xl font-bold'>{note?.title}</h2>
            <p 
           
            className="px-2 py-1 text-xs font-semibold rounded-full capitalize bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">{note?.category}</p>
        </div>

        <div id='contentBox' className=' w-full p-2 mt-3 '>
          <pre id='content'  
          className='w-full whitespace-pre-wrap h-screen  p-1  '
          ref={contentRef}>{note?.content}</pre>
        

        </div>
        <div className='hidden w-full p-2 mt-3 ' id='input'>
         <textarea 
         onChange={(e) => setNote({...note, content: e.target.value})}
         value={note?.content}
         className='focus w-full whitespace-pre-wrap h-screen row-end-13 p-2 border-2 border-gray-400 rounded-lg'
         >{note?.content}</textarea>
        </div>
     </div>
    </>
  )
}

export default SingleNotePage

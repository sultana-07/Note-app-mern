import React ,{useEffect}from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const TrashNotes = () => {
    const [notes, setNotes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/note/gettrash`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNotes(response.data);
                console.log(response.data);
                
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch notes');
                setLoading(false);
            }
        };

        fetchNotes();
    },[]);

    

   const deleteNote = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            await axios.delete(`${import.meta.env.VITE_BASEURL}/note/gettrash/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            setError('Failed to delete note');
        }
    }

    const restoreNote = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            const singlenote = await axios.get(`${import.meta.env.VITE_BASEURL}/note/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const note = singlenote.data;
            await axios.put(`${import.meta.env.VITE_BASEURL}/note/restore/${id}`,
                note, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotes(notes.filter(note => note._id !== id));

        }
        catch (err) {
            setError('Failed to restore note');
        }
    }

 
    
  return (
   <>
    <div className='h-screen w-full p-2  '>
       <div className='w-full p-2 bg-green-400 '>
           <h1 className='text-3xl text-center font-bold '>Trash Notes</h1>
        <p className='text-center '>All your deleted notes will be here</p>
       </div>

      {notes.length === 0 &&  
        <div className='flex justify-center items-center h-full'>
            <div className='bg-white p-4 rounded-lg shadow-lg'>
                <h2 className='text-xl font-semibold'>No notes in trash</h2>
                <p className='text-gray-600'>You have not deleted any notes yet.</p>
            </div>
        </div>    
        }
        
        {loading &&
        <div className='w-full mt-4 flex justify-center items-center'> 
            <h2 className='text-2xl font-bold'>searching...</h2>

        </div>
            }
        <div className='w-full flex flex-col py-4 justify-center items-center mt-7'>
            {notes.map((note) => (
                 <div key={note._id} className='bg-white w-full mt-3 p-2 rounded-lg shadow-lg border-1 '>
               <div className='w-full flex justify-between items-center px-2'>
                      <h2 className='font-semibold text-2xl'>{note.title}</h2>
                      <p className='text-blue-600 '>{note.category}</p>
               </div>
                <p className='mt-2 ml-1'>{note.content.slice(0,90)}...</p>
                <div className='w-full mt-3 flex justify-between'>
                    <button
                    onClick={() => restoreNote(note._id)}
                    className='bg-green-500 text-white px-2 py-1 rounded-lg'>Restore</button>
                    <button
                    onClick={() => deleteNote(note._id)}
                    className='bg-red-500 text-white px-4 py-2 rounded-lg'>Delete</button>
                </div>
            </div>
            ))}
        </div>
    </div>
   </>
  )
}

export default TrashNotes

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get('https://notes-manager-back-end.onrender.com/api/notes');
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error('Failed to fetch notes');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add a new note
  const addNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://notes-manager-back-end.onrender.com/api/notes', form);
      toast.success('Note added successfully!');
      setForm({ title: '', description: '' });
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error('Failed to add note');
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4">📝 Notes Manager</h2>

      <form onSubmit={addNote} className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>

      <div>
        {notes.map(note => (
          <div key={note._id} className="card mb-3">
            <div className="card-body">
              <h5>{note.title}</h5>
              <p>{note.description}</p>
              <small className="text-muted">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

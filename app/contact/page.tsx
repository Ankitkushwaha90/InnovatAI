// app/contact/page.tsx
'use client';

import { useState, useEffect } from 'react';

type ContactType = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  projectType: string;
  priority: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactType>({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectType: 'AI Model',
    priority: 'Medium',
  });

  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? '/api/contacts' : '/api/contacts';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...formData, _id: editingId } : formData),
      });

      if (!response.ok) throw new Error('Operation failed');

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        projectType: 'AI Model',
        priority: 'Medium',
      });
      setEditingId(null);
      await fetchContacts();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (contact: ContactType) => {
    setFormData(contact);
    setEditingId(contact._id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    setIsLoading(true);
    try {
      await fetch('/api/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id }),
      });
      await fetchContacts();
    } catch (error) {
      console.error('Failed to delete contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-400 mb-4">AI/ML Project Contact Management</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Manage client contacts for your AI/ML projects with full CRUD functionality
          </p>
        </div>

        {/* Contact Form */}
        <div id="contact" className="bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-green-400">
            {editingId ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name *</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-gray-300 mb-2">Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="AI Model">AI Model</option>
                  <option value="ML Pipeline">ML Pipeline</option>
                  <option value="Data Analysis">Data Analysis</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="priority" className="block text-gray-300 mb-2">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : editingId ? 'Update Contact' : 'Add Contact'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    projectType: 'AI Model',
                    priority: 'Medium',
                  });
                  setEditingId(null);
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Contacts List */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Client Contacts</h2>
          
          {isLoading && !contacts.length ? (
            <div className="text-center py-8">
              <p className="text-gray-300">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-300">No contacts found. Add your first contact!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contact.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contact.projectType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${contact.priority === 'High' ? 'bg-red-900 text-red-100' : 
                            contact.priority === 'Medium' ? 'bg-yellow-900 text-yellow-100' : 
                            'bg-green-900 text-green-100'}`}>
                          {contact.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(contact)}
                          className="text-green-400 hover:text-green-300 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => contact._id && handleDelete(contact._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
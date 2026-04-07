import React, { useState } from 'react';
import { useBooks } from '../../../context/BookContext';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import { DataTable } from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { Edit2, Trash2, Plus } from 'lucide-react';

const ManageBooks = () => {
    const { books, CATEGORIES, addBook, updateBook, deleteBook } = useBooks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: CATEGORIES[1] || 'Computer Science',
        image: '',
        rating: 4.0
    });

    const openModal = (book = null) => {
        if (book) {
            setCurrentBook(book);
            setFormData({ ...book });
        } else {
            setCurrentBook(null);
            setFormData({
                title: '',
                author: '',
                category: CATEGORIES[1] || 'Computer Science',
                image: '',
                rating: 4.0
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentBook) {
            updateBook(formData);
        } else {
            addBook(formData);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            deleteBook(id);
        }
    };

    const columns = [
        {
            header: 'Cover',
            accessor: 'image',
            render: (row) => (
                <img src={row.image} alt={row.title} style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
            )
        },
        { header: 'Title', accessor: 'title' },
        { header: 'Author', accessor: 'author' },
        { header: 'Category', accessor: 'category' },
        {
            header: 'Rating',
            accessor: 'rating',
            render: (row) => <span>⭐ {row.rating}</span>
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="action-buttons">
                    <Button variant="outline" size="sm" onClick={() => openModal(row)} icon={Edit2}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)} icon={Trash2}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <div className="dashboard-content-section animate-fade-in">
            <Card>
                <CardHeader
                    title="Manage Books"
                    action={
                        <Button variant="primary" icon={Plus} onClick={() => openModal()}>
                            Add New Book
                        </Button>
                    }
                />
                <CardBody className="no-padding">
                    <DataTable columns={columns} data={books} />
                </CardBody>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={currentBook ? "Edit Book" : "Add New Book"}
                size="md"
            >
                <form onSubmit={handleSubmit} className="p-4">
                    <Input
                        label="Book Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                    <div className="input-group">
                        <label className="input-label">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            {CATEGORIES.filter(c => c !== 'All').map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <Input
                        label="Cover Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                    <Input
                        label="Rating (1-5)"
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                    />
                    <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
                        <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" type="submit">{currentBook ? "Update Book" : "Add Book"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageBooks;

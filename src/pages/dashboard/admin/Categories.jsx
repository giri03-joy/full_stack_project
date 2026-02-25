import React, { useState } from 'react';
import { useBooks } from '../../../context/BookContext';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import { DataTable } from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { Edit2, Trash2, Plus, Layers } from 'lucide-react';

const Categories = () => {
    const { books, CATEGORIES, addCategory, updateCategory, deleteCategory } = useBooks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    // Generate table data by combining category names with book counts
    const categoryData = CATEGORIES.map(category => ({
        name: category,
        bookCount: category === 'All'
            ? books.length
            : books.filter(b => b.category === category).length
    }));

    const openModal = (category = null) => {
        if (category && category !== 'All') {
            setCurrentCategory(category);
            setCategoryName(category);
        } else {
            setCurrentCategory(null);
            setCategoryName('');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!categoryName.trim() || categoryName.trim().toLowerCase() === 'all') {
            alert('Invalid category name');
            return;
        }

        const trimmedName = categoryName.trim();

        if (currentCategory) {
            updateCategory(currentCategory, trimmedName);
        } else {
            if (CATEGORIES.includes(trimmedName)) {
                alert('Category already exists');
                return;
            }
            addCategory(trimmedName);
        }
        closeModal();
    };

    const handleDelete = (category) => {
        if (category === 'All') return;

        const booksInCategory = books.filter(b => b.category === category).length;
        const warningMsg = booksInCategory > 0
            ? `Warning: There are ${booksInCategory} book(s) in this category. Deleting it will keep the books but their category might be invalid until re-assigned. Proceed?`
            : `Are you sure you want to delete the category "${category}"?`;

        if (window.confirm(warningMsg)) {
            deleteCategory(category);
        }
    };

    const columns = [
        { header: 'Category Name', accessor: 'name' },
        {
            header: 'Number of Books',
            accessor: 'bookCount',
            render: (row) => (
                <span className="font-semibold">{row.bookCount} Books</span>
            )
        },
        {
            header: 'Actions',
            render: (row) => row.name === 'All' ? (
                <span className="text-muted text-sm italic">System Default</span>
            ) : (
                <div className="action-buttons">
                    <Button variant="outline" size="sm" onClick={() => openModal(row.name)} icon={Edit2}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(row.name)} icon={Trash2}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <div className="dashboard-content-section animate-fade-in">
            <Card>
                <CardHeader
                    title="Manage Categories"
                    action={
                        <Button variant="primary" icon={Plus} onClick={() => openModal()}>
                            Add New Category
                        </Button>
                    }
                />
                <CardBody className="no-padding">
                    <DataTable columns={columns} data={categoryData} />
                </CardBody>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={currentCategory ? "Edit Category" : "Add New Category"}
                size="sm"
            >
                <form onSubmit={handleSubmit} className="p-4">
                    <Input
                        label="Category Name"
                        name="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="e.g., History"
                        required
                    />

                    <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
                        <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" type="submit">{currentCategory ? "Update" : "Add"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Categories;

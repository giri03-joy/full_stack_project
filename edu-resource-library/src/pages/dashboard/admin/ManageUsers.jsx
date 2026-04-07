import React, { useState } from 'react';
import { useUsers } from '../../../context/UserContext';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import { DataTable } from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { Edit2, Trash2, Plus, UserPlus } from 'lucide-react';

const ManageUsers = () => {
    const { usersList, addUser, updateUser, deleteUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Student',
        status: 'Active'
    });

    const openModal = (user = null) => {
        if (user) {
            setCurrentUser(user);
            setFormData({ ...user });
        } else {
            setCurrentUser(null);
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'Student',
                status: 'Active'
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
        if (currentUser) {
            updateUser(formData);
        } else {
            addUser(formData);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(id);
        }
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
        {
            header: 'Status',
            render: (row) => (
                <span className={`status-badge status-${row.status.toLowerCase()}`}>
                    {row.status}
                </span>
            )
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
                    title="Manage Users"
                    action={
                        <Button variant="primary" icon={UserPlus} onClick={() => openModal()}>
                            Add New User
                        </Button>
                    }
                />
                <CardBody className="no-padding">
                    <DataTable columns={columns} data={usersList} />
                </CardBody>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={currentUser ? "Edit User" : "Add New User"}
                size="md"
            >
                <form onSubmit={handleSubmit} className="p-4">
                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {!currentUser && (
                        <Input
                            label="Password (min 6 chars)"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <div className="input-group">
                        <label className="input-label">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            <option value="Student">Student</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
                        <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" type="submit">{currentUser ? "Update User" : "Add User"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageUsers;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../../context/BookContext';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Upload, FileText, CheckCircle } from 'lucide-react';

const UploadMaterials = () => {
    const { CATEGORIES, addBook } = useBooks();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: CATEGORIES[1] || 'Computer Science',
        image: '',
        pdfUrl: '',
        rating: 4.5, // Default rating for new uploads
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, file: e.target.files[0] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate an upload delay for better UX
        setTimeout(() => {
            // Extract file data here if needed, but for now we just add to context
            const newBook = {
                title: formData.title,
                author: formData.author,
                category: formData.category,
                image: formData.image || 'https://covers.openlibrary.org/b/isbn/9780131103627-L.jpg', // Fallback cover
                pdfUrl: formData.pdfUrl || (formData.file ? URL.createObjectURL(formData.file) : 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf'),
                rating: Number(formData.rating)
            };

            addBook(newBook);
            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset form
            setFormData({
                title: '',
                author: '',
                category: CATEGORIES[1] || 'Computer Science',
                image: '',
                pdfUrl: '',
                rating: 4.5,
                file: null
            });

            // Reset success message after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);

        }, 1500);
    };

    return (
        <div className="dashboard-content-section animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader
                    title="Upload New Material"
                    action={<Button variant="outline" onClick={() => navigate('/dashboard/admin/books')}>View Library</Button>}
                />
                <CardBody>
                    {isSuccess && (
                        <div className="alert alert-success mt-0 mb-4 bg-success-light text-success border border-success rounded p-3" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle size={20} />
                            <span>Material successfully uploaded and added to the library!</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="upload-form">
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="form-col" style={{ gridColumn: '1 / -1' }}>
                                <Input
                                    label="Material Title"
                                    name="title"
                                    placeholder="e.g., Introduction to React"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Input
                                label="Author / Instructor"
                                name="author"
                                placeholder="Author Name"
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

                            <div className="form-col" style={{ gridColumn: '1 / -1' }}>
                                <Input
                                    label="Cover Image URL (Optional)"
                                    name="image"
                                    placeholder="https://example.com/cover.jpg"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                                <small className="text-muted" style={{ display: 'block', marginTop: '-10px', marginBottom: '15px' }}>
                                    Leave blank to use a default placeholder cover.
                                </small>
                            </div>

                            <div className="form-col" style={{ gridColumn: '1 / -1' }}>
                                <Input
                                    label="Direct PDF Link (Overrides File Upload)"
                                    name="pdfUrl"
                                    placeholder="https://example.com/document.pdf"
                                    value={formData.pdfUrl}
                                    onChange={handleChange}
                                />
                                <div className="input-group mt-4">
                                    <label className="input-label">Or Upload PDF / Document (Local Browser Session Only)</label>
                                    <div
                                        className="file-upload-area p-5 text-center"
                                        style={{
                                            border: '2px dashed var(--border-color)',
                                            borderRadius: 'var(--border-radius)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            cursor: 'pointer',
                                            transition: 'var(--transition)'
                                        }}
                                        onClick={() => document.getElementById('file-upload').click()}
                                    >
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept=".pdf,.doc,.docx"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />

                                        {formData.file ? (
                                            <div className="selected-file" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                                <FileText size={48} className="text-primary" />
                                                <p className="font-semibold">{formData.file.name}</p>
                                                <p className="text-sm text-muted">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        ) : (
                                            <div className="upload-prompt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                                <Upload size={48} className="text-muted" />
                                                <p className="font-semibold text-lg">Click to browse or drag and drop</p>
                                                <p className="text-muted text-sm">Supported formats: PDF, DOC, DOCX (Max 50MB)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions mt-5 pt-4 border-t" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-color)' }}>
                            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/admin')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" icon={Upload} disabled={isSubmitting}>
                                {isSubmitting ? 'Uploading...' : 'Upload Material'}
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default UploadMaterials;

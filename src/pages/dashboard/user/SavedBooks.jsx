import React from 'react';
import { useBooks } from '../../../context/BookContext';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { BookOpen, Bookmark, Star, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedBooks = () => {
    const { books, savedBookIds, toggleSaveBook } = useBooks();
    const navigate = useNavigate();

    // Filter books to only those whose IDs exist in the savedBookIds array
    const savedBooksList = books.filter(book => savedBookIds.includes(book.id));

    return (
        <div className="dashboard-content-section animate-fade-in dashboard-saved-books">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Saved Books</h2>
                    <p className="text-muted">Your personal customized reading list.</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/library')}>Browse Library</Button>
            </header>

            {savedBooksList.length === 0 ? (
                <Card className="text-center p-12 mt-8">
                    <CardBody className="flex flex-col items-center gap-4">
                        <Bookmark size={64} className="text-muted" />
                        <h3 className="text-xl font-bold mt-2">Your reading list is empty</h3>
                        <p className="text-muted max-w-md mx-auto">You haven't saved any books yet. Head over to the Digital Library to find material that interests you.</p>
                        <Button variant="primary" className="mt-4" onClick={() => navigate('/library')}>Go to Library</Button>
                    </CardBody>
                </Card>
            ) : (
                <div className="library-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1.5rem',
                    alignItems: 'stretch'
                }}>
                    {savedBooksList.map(book => (
                        <Card key={book.id} hoverable className="library-card h-full flex flex-col">
                            <div className="library-card-img-wrapper relative h-64 w-full bg-bg-secondary flex justify-center py-4">
                                <img src={book.image} alt={book.title} className="h-full w-auto object-cover shadow-md" style={{ maxHeight: '100%' }} />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity gap-3">
                                    <Button variant="primary" size="sm" icon={Eye} className="w-3/4 justify-center">Read Now</Button>
                                    <Button variant="outline" size="sm" icon={Download} className="w-3/4 justify-center bg-white text-text-primary border-none">Download</Button>
                                </div>
                            </div>
                            <CardBody className="library-card-body flex-grow flex flex-col">
                                <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{book.category}</div>
                                <h3 className="text-lg font-bold mb-1 leading-tight line-clamp-2">{book.title}</h3>
                                <p className="text-sm text-muted mb-auto pb-4">{book.author}</p>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                                    <div className="flex items-center gap-1 bg-warning-light text-warning px-2 py-1 rounded text-xs font-bold">
                                        <Star size={12} fill="currentColor" />
                                        <span>{book.rating}</span>
                                    </div>
                                    <button
                                        className="text-primary hover:text-danger hover:bg-danger-light p-2 rounded-full transition-colors flex items-center justify-center"
                                        onClick={() => toggleSaveBook(book.id)}
                                        title="Remove from Saved"
                                    >
                                        <Bookmark size={20} fill="currentColor" />
                                    </button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedBooks;

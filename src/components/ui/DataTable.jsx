import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import './DataTable.css';

export const DataTable = ({ columns, data, className = '' }) => {
    return (
        <div className={`table-container ${className}`}>
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="table-th">{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="table-tr">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="table-td">
                                        {col.render ? col.render(row) : row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="table-empty">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>
            <div className="pagination-controls">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    icon={ChevronLeft}
                >
                    Prev
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next <ChevronRight size={16} className="btn-icon" />
                </Button>
            </div>
        </div>
    );
};

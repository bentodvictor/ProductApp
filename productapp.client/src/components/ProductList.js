import React, { useState } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';

export const ProductList = ({ products, onEdit, onDelete, onAdd }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const sortedProducts = [...products].sort((a, b) => {
        if (a[sortConfig.key]?.toLowerCase() < b[sortConfig.key]?.toLowerCase()) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key]?.toLowerCase() > b[sortConfig.key]?.toLowerCase()) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <>
            <Button variant="outline-primary" onClick={_ => onAdd(null)} className="mb-4 mt-4 shadow">
                <i className="bi bi-plus-circle"></i> Add new product
            </Button>
            <Table striped bordered hover>
                <thead className="table-primary">
                    <tr>
                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                            Product Name {
                                sortConfig.key === 'name'
                                    ? (sortConfig.direction === 'asc'
                                        ? <i className="bi bi-arrow-up-short"></i>
                                        : <i className="bi bi-arrow-down-short"></i>)
                                    : ''}
                        </th>
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='table-sm'>
                    {currentProducts.map(product => (
                        <tr key={product.id} onClick={() => onEdit(product)}>
                            <td>{product.name}</td>
                            <td>{product.value}</td>
                            <td>
                                <Button variant='outline-danger' onClick={e => {
                                    e.stopPropagation();
                                    onDelete(product.id);
                                }}>
                                    <i className="bi bi-trash3-fill"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                <div className='shadow d-flex'>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </div>
            </Pagination>
        </>
    );
};
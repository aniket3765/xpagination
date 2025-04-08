import React, { useEffect, useState } from 'react';

const PAGE_SIZE = 10;

export default function EmployeePagination() {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(
            'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        )
            .then((res) => {
                if (!res.ok) throw new Error('Fetch failed');
                return res.json();
            })
            .then((data) => setEmployees(data))
            .catch(() => {
                setError(true);
                alert('failed to fetch data');
            });
    }, []);

    const totalPages = Math.ceil(employees.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const currentEmployees = employees.slice(startIndex, startIndex + PAGE_SIZE);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Employee List</h2>

            {error && <p>Error loading data</p>}

            {!error && (
                <>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#009688', color: 'white' }}>
                            <tr>
                                <th style={headerCellStyle}>ID</th>
                                <th style={headerCellStyle}>Name</th>
                                <th style={headerCellStyle}>Email</th>
                                <th style={headerCellStyle}>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp) => (
                                <tr key={emp.id} style={{ backgroundColor: '#fff' }}>
                                    <td style={cellStyle}>{emp.id}</td>
                                    <td style={cellStyle}>{emp.name}</td>
                                    <td style={cellStyle}>{emp.email}</td>
                                    <td style={cellStyle}>{emp.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                        <button onClick={handlePrevious}  style={buttonStyle}>
                            Previous
                        </button>
                        <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
                        <button onClick={handleNext} style={buttonStyle}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

// 🔹 Inline styles
const headerCellStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

const cellStyle = {
    padding: '12px',
    borderBottom: '1px solid #eee',
};

const buttonStyle = {
    padding: '8px 16px',
    margin: '0 5px',
    backgroundColor: '#009688',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};


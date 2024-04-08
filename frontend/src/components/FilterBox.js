import React, { Component } from 'react';

class FilterBox extends Component {
    state = {
        selectedField: '',
        sortOrder: 'asc'
    };

    handleFieldChange = (event) => {
        this.setState({ selectedField: event.target.value });
    };

    handleSortOrderChange = (event) => {
        this.setState({ sortOrder: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { selectedField, sortOrder } = this.state;
        this.props.onSubmit(selectedField, sortOrder);
        // Reset the selected field and sort order after submission
        this.setState({ selectedField: '', sortOrder: '' });
    };

    render() {
        const styles = {
            filterBox: {
                background: '#f7f7f7',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '20px',
                width: 'fit-content',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center items horizontally
            },
            selectField: {
                padding: '10px',
                marginRight: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '16px',
            },
            radioContainer: {
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center', // Center items horizontally
            },
            radioButton: {
                marginRight: '10px',
                cursor: 'pointer',
            },
            submitButton: {
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                background: '#009688',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
            },
        };

        return (
            <div style={styles.filterBox}>
                <form onSubmit={this.handleSubmit}>
                    <select
                        value={this.state.selectedField}
                        onChange={this.handleFieldChange}
                        style={styles.selectField}
                    >
                        <option value="">Select Field</option>
                        <option value="employeeName">Employee Name</option>
                        {/* <option value="contactNumber">Contact Number</option> */}
                        <option value="NIC">NIC</option>
                        {/* <option value="address">Address</option> */}
                        {/* <option value="email">Email</option> */}
                        <option value="jobCategory">Job Category</option>
                        {/* <option value="basicSalary">Basic Salary</option> */}
                        {/* <option value="otRate">OT Rate</option> */}
                    </select>
                    <h2 style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>Sort By:</h2>
                    <div style={styles.radioContainer}>
                        <label style={styles.radioButton}>
                            <input
                                type="radio"
                                value="asc"
                                checked={this.state.sortOrder === 'asc'}
                                onChange={this.handleSortOrderChange}
                            />
                            Asc
                        </label>
                        <label style={styles.radioButton}>
                            <input
                                type="radio"
                                value="desc"
                                checked={this.state.sortOrder === 'desc'}
                                onChange={this.handleSortOrderChange}
                            />
                            Desc
                        </label>
                    </div>
                    <button type="submit" style={styles.submitButton}>FILTER</button>
                </form>
            </div>
        );
    }
}

export default FilterBox;

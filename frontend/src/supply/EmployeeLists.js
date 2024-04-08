import React, { Component } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import swal from 'sweetalert';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import 'jspdf-autotable'; 

class EmployeeLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,
            isSidebarOpen: false,
            employees: [],
            isAddModalOpen: false,
            isEditModalOpen: false,
            currentEmployeeId: '',
            newEmployee: {
                employeeName:'',
                contactNumber:'',
                NIC:'',
                address:'',
                email:'',
                jobCategory:'',
                basicSalary:'',
                otRate:'',
            },
            validationMessages: {
                employeeName:'',
                contactNumber:'',
                NIC:'',
                address:'',
                email:'',
                jobCategory:'',
                basicSalary:'',
                otRate:'',
            },
            searchQuery: '', 
            filteredEmployees: [],
        };
    }

    componentDidMount() {
        this.fetchEmployees();
    }

    fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5555/employees');
            this.setState({ employees: response.data.data, filteredEmployees: response.data.data });
        } catch (error) {
            console.error("Couldn't fetch employees", error);
        }
    };

    toggleDarkMode = () => {
        const { isDarkMode } = this.state;
        this.setState(prevState => ({
            isDarkMode: !prevState.isDarkMode,
        }));
        document.body.classList.toggle("dark", !isDarkMode);
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            isSidebarOpen: !prevState.isSidebarOpen,
        }));
    }

    handlePDFGeneration = async () => {
        try {
            const response = await axios.get('http://localhost:5555/employees');
            const employees = response.data.data;

            if (employees.length > 0) {
                const pdf = new jsPDF();
                
                pdf.setFontSize(24);
                pdf.setTextColor(44, 62, 80);
                pdf.text('Employee List', 105, 20, null, null, 'center');
    
                const tableHeaders = ['Employee Name', 'Contact Number', 'NIC', 'Address', 'Email', 'Job Category', 'Basic Salary', 'OT Rate'];
    
                const tableData = employees.map(employee => [
                    employee.employeeName,
                    employee.contactNumber,
                    employee.NIC,
                    employee.address,
                    employee.email,
                    employee.jobCategory,
                    employee.basicSalary,
                    employee.otRate
                ]);
    
                const tableStyle = {
                    margin: { top: 40 },
                    headStyles: { fillColor: [44, 62, 80], textColor: 255, fontSize: 12 },
                    bodyStyles: { textColor: 44, fontSize: 10 },
                    alternateRowStyles: { fillColor: 245 },
                    startY: 30
                };
    
                pdf.autoTable(tableHeaders, tableData, tableStyle);
    
                pdf.save('Employees_List.pdf');
            } else {
                console.error('No employees found.');
                swal("No Employees", "There are no employees to generate a PDF.", "info");
            }
        } catch (error) {
            console.error("Couldn't fetch employees", error);
            swal("Error", "There was a problem fetching employees.", "error");
        }
    };

    validateForm = () => {
        const { newEmployee } = this.state;
        let isValid = true;
        let validationMessages = {
            employeeName:'',
            contactNumber:'',
            NIC:'',
            address:'',
            email:'',
            jobCategory:'',
            basicSalary:'',
            otRate:''
        };

        if (!newEmployee.employeeName) {
            validationMessages.companyName = 'Employee Name cannot be empty.';
            isValid = false;
        }
        if (!newEmployee.contactNumber.match(/^\d{10}$/)) {
            validationMessages.contactNumber = 'Enter a valid contact number (10 digits).';
            isValid = false;
        }
        if (!newEmployee.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
            validationMessages.email = 'Enter a valid email address.';
            isValid = false;
        }
        if (!newEmployee.address) {
            validationMessages.address = 'Address cannot be empty.';
            isValid = false;
        }
        if (!newEmployee.jobCategory) {
            validationMessages.jobCategory = 'Job Category cannot be empty.';
            isValid = false;
        }

        this.setState({ validationMessages });

        return isValid;
    }

    handleChange = (field, value) => {
        this.setState(prevState => ({
            newEmployee: {
                ...prevState.newEmployee,
                [field]: value
            }
        }));
    }

    render() {
        const { isDarkMode, isSidebarOpen } = this.state;
        const cardStyleAdjustment = {
            transition: 'all 0.3s',
            marginLeft: isSidebarOpen ? '90px' : '80px',
            width: isSidebarOpen ? 'calc(100% - 150px)' : '85%' 
        };
const commonStyles = {
            cardStyle: {
                display: 'absolute',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '20px',
                marginTop: '1%',
                backgroundColor: isDarkMode ? '#333' : '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                padding: '20px',
                fontFamily: 'sans-serif',
                position: 'relative',
                ...cardStyleAdjustment,
                transition: 'all 0.3s',
                marginLeft: 'var(--sidebar-width, 80px)',
                width: 'calc(100% - var(--sidebar-width, 80px) - 20px)', 
            },

            tableStyle: {
                width: '97%', borderCollapse: 'collapse', marginTop: '2px',
                

            },
            thStyle: {
                backgroundColor: isDarkMode ? '#555' : '#ddd', color: isDarkMode ? '#ddd' : '#333', padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd', whiteSpace: 'nowrap',
            },
            tdStyle: {
                padding: '12px 15px', borderBottom: '1px solid #ddd', color: isDarkMode ? '#ddd' : '#333', textAlign: 'left',
            },
            actionStyle: {
                display: 'flex', justifyContent: 'space-around',
            },
            buttonContainerStyle: {
                position: 'absolute', top: '8%', right: '20px', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
            },
            inputStyle: {
                width: '100%', padding: '10px', marginTop: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: isDarkMode ? '#444' : '#fff', color: isDarkMode ? '#ddd' : '#333',
            },
            buttonStyle: {
                width: '80%',
                 padding: '2%',
                  marginRight: '10px',
                   marginTop: '10px',
                    borderRadius: '5px',
                     border: 'none',
                      backgroundColor: '#009688',
                       color: '#fff', cursor: 'pointer', fontSize: '16px', textDecoration: 'none'
            },
            buttonStyle4: {
                width: '80%',
                 padding: '2%',
                  marginRight: '10px',
                   marginTop: '10px',
                    borderRadius: '5px',
                     border: 'none',
                      backgroundColor: '#285955',
                       color: '#fff', cursor: 'pointer', fontSize: '16px', textDecoration: 'none'
            },
            validationMessageStyle: {
                color: '#ff3860', fontSize: '0.8rem', marginTop: '0.25rem',
            },
            buttonStyle2: {
                padding: '8px 10px',
                borderRadius: '5px',
                fontSize: '14px',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                marginTop: '20px',
                width: '10%',
                marginLeft: '85%'
            },
            buttonStyle3: {
                padding: '8px 10px',
                borderRadius: '5px',
                fontSize: '14px',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                marginTop: '10px',
                marginBottom: '1%',
                width: '10%',
                marginLeft: '85%'
            }
        };

    return (
        <div className={`container ${isDarkMode ? "dark" : ""}`}  style={{ marginTop: '4%' }}>
            <Header isDarkMode={isDarkMode} />
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={this.toggleSidebar}
                isDarkMode={isDarkMode}
                toggleDarkMode={this.toggleDarkMode}
            />
            <button onClick={this.handlePDFGeneration} style={{ ...commonStyles.buttonStyle2, background: '#009688' }}>
                Generate PDF
            </button>
            <Link to="/manage-employees">
                <button style={{ ...commonStyles.buttonStyle2, background: '#009688', marginRight: '10% '}}>Employee manage</button>
            </Link>
            <div className="home">
                <div style={commonStyles.cardStyle}>
                    <input
                        type="text"
                        placeholder="Search by Company Name or Product Type"
                        style={{ ...commonStyles.inputStyle, marginBottom: '10px' }}
                        value={this.state.searchQuery}
                        onChange={this.handleSearch}
                    />
                    <table id="employees-table" style={commonStyles.tableStyle}>
                        <thead>
                            <tr>
                                <th style={commonStyles.thStyle}>Employee Name</th>
                                <th style={commonStyles.thStyle}>Contact Number</th>
                                <th style={commonStyles.thStyle}>NIC</th>
                                <th style={commonStyles.thStyle}>Address</th>
                                <th style={commonStyles.thStyle}>Email</th>
                                <th style={commonStyles.thStyle}>Job Category</th>
                                <th style={commonStyles.thStyle}>Basic Salary</th>
                                <th style={commonStyles.thStyle}>OT Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filteredEmployees.map(employee => (
                                <tr key={employee._id}>
                                    <td style={commonStyles.tdStyle}>{employee.employeeName}</td>
                                    <td style={commonStyles.tdStyle}>{employee.contactNumber}</td>
                                    <td style={commonStyles.tdStyle}>{employee.NIC}</td>
                                    <td style={commonStyles.tdStyle}>{employee.address}</td>
                                    <td style={commonStyles.tdStyle}>{employee.email}</td>
                                    <td style={commonStyles.tdStyle}>{employee.jobCategory}</td>
                                    <td style={commonStyles.tdStyle}>{employee.basicSalary}</td>
                                    <td style={commonStyles.tdStyle}>{employee.otRate}</td>
                               
                                    </tr>
                                ))}
                            </tbody>    
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeLists;

import express from 'express';
import { Employee } from '../models/employeeModel.js';

const router = express.Router();

// Route for Save a new Employee
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.employeeName ||
      !request.body.contactNumber ||
      !request.body.NIC ||
      !request.body.address ||
      !request.body.email ||
      !request.body.jobCategory ||
      !request.body.basicSalary ||
      !request.body.otRate
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }
    const newEmployee = {
      employeeName: request.body.employeeName,
      contactNumber: request.body.contactNumber,
      NIC: request.body.NIC,
      address: request.body.address,
      email: request.body.email,
      jobCategory: request.body.jobCategory,
      basicSalary: request.body.basicSalary,
      otRate: request.body.otRate,
    };

    const employee = await Employee.create(newEmployee);

    return response.status(201).send(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Employees from database
router.get('/', async (request, response) => {
  try {
    const employees = await Employee.find({});

    return response.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Employee from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update an Employee
router.put('/:id', async (request, response) => {
  try {
    const updateData = {
      employeeName: request.body.employeeName,
      contactNumber: request.body.contactNumber,
      NIC: request.body.NIC,
      address: request.body.address,
      email: request.body.email,
      jobCategory: request.body.jobCategory,
      basicSalary: request.body.basicSalary,
      otRate: request.body.otRate,
    };

    const { id } = request.params;

    const result = await Employee.findByIdAndUpdate(id, updateData, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).json({ message: 'Employee updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an Employee
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Employee.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

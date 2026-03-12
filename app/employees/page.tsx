"use client"

import { useEffect, useState } from "react"
import { getEmployees, deleteEmployee, addEmployee } from "../src/lib/api"

import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material"

export default function EmployeePage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  })

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees()
      setEmployees(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    console.log([e.target.name], e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleAddEmployee = async () => {
    try {
      await addEmployee(form)

      setForm({
        employeeId: "",
    fullName: "",
    email: "",
    department: ""
      })

      fetchEmployees()
    } catch (err) {
      alert("Error adding employee")
    }
  }

  const handleDelete = async (id: string) => {
    await deleteEmployee(id)
    fetchEmployees()
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Employee Management
      </Typography>

      {/* Add Employee Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Add Employee
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Employee ID"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>

          <Stack direction="row" mt={3}>
            <Button
              variant="contained"
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardContent>

          {loading ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : employees.length === 0 ? (
            <Typography>No employees found</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Department</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.employeeId}>
                    <TableCell>{emp.employeeId}</TableCell>
                    <TableCell>{emp.fullName}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.department}</TableCell>

                    <TableCell>
                      <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => handleDelete(emp.employeeId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

        </CardContent>
      </Card>
    </Container>
  )
}
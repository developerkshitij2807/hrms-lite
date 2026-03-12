"use client"

import { useState } from "react"
import { markAttendance } from "../src/lib/api"

import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack
} from "@mui/material"

export default function AttendancePage() {

  const [attendance, setAttendance] = useState<any[]>([])

  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present"
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      await markAttendance(form)

      setAttendance([...attendance, form])

      setForm({
        employeeId: "",
        date: "",
        status: "Present"
      })
    } catch (err) {
      alert("Failed to mark attendance")
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>

      <Typography variant="h4" fontWeight="bold" mb={3}>
        Attendance Management
      </Typography>

      {/* Attendance Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Typography variant="h6" mb={2}>
            Mark Attendance
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
                type="date"
                label="Date"
                name="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
              </TextField>
            </Grid>

          </Grid>

          <Stack mt={3}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!form.employeeId || !form.date}
            >
              Mark Attendance
            </Button>
          </Stack>

        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardContent>

          <Typography variant="h6" mb={2}>
            Attendance Records
          </Typography>

          {attendance.length === 0 ? (
            <Typography>No attendance records yet</Typography>
          ) : (
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell><b>Employee ID</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {attendance.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.employeeId}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.status}</TableCell>
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
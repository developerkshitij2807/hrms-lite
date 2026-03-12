import Link from "next/link"

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>HRMS Lite</h1>

      <Link href="/employees">Employees</Link>
      <br />
      <Link href="/attendance">Attendance</Link>
    </div>
  )
}
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import { CONSTANTS } from "../constants";
import axios from "axios";

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
}

interface Application {
  applicationId: number;
  companyName: string;
  jobTitle: string;
  date: string;
  country: string;
  comment: string;
  status: string;
  user: User;
}

const Home = () => {
  const { userId } = useParams();

  const [data, setData] = useState<Application[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(data);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        CONSTANTS.ENDPOINT.APPLICATION_GET(Number(userId))
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <>
      {loading || !data ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Role Title</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((app) => (
                <TableRow key={app.applicationId}>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>{app.companyName}</TableCell>
                  <TableCell>{app.jobTitle}</TableCell>
                  <TableCell>{app.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Home;

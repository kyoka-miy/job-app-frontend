import React, { useState, useEffect, useCallback } from "react";
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
  styled,
  tableCellClasses,
  Stack,
  Button,
  InputBase,
  IconButton,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { CONSTANTS } from "../constants";
import axios from "axios";
import AddModal from "./addModal";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const { userId } = useParams();
  const [data, setData] = useState<Application[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Prevent unnecessary re-render
  const fetchData = useCallback(async () => {
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
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]);

  const onSearch = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const response = await axios.get(
          CONSTANTS.ENDPOINT.APPLICATION_GET_BY_TEXT(Number(userId), searchText)
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [userId, searchText]
  );

  return (
    <>
      <Box margin="auto" textAlign="center" padding={8}>
        <AddModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userId={Number(userId)}
        />
        {loading || !data ? (
          <Typography variant="h5" gutterBottom>
            Loading...
          </Typography>
        ) : (
          <Stack spacing={8}>
            <Typography variant="h5" gutterBottom>
              Your Applications
            </Typography>
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                  }}
                  onSubmit={onSearch}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Button onClick={() => setIsModalOpen(true)}>
                  New
                  <AddIcon />
                </Button>
              </Stack>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Applied Date</StyledTableCell>
                      <StyledTableCell>Company</StyledTableCell>
                      <StyledTableCell>Role Title</StyledTableCell>
                      <StyledTableCell>Location</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((app) => (
                      <StyledTableRow key={app.applicationId}>
                        <StyledTableCell>{app.status}</StyledTableCell>
                        <StyledTableCell>{app.date}</StyledTableCell>
                        <StyledTableCell>{app.companyName}</StyledTableCell>
                        <StyledTableCell>{app.jobTitle}</StyledTableCell>
                        <StyledTableCell>{app.country}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default Home;

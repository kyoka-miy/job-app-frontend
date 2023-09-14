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

interface FormData {
  companyName: string;
  jobTitle: string;
  date: Date;
  location: string;
  status: string;
  note: string;
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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const { userId } = useParams();
  const [data, setData] = useState<Application[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    jobTitle: "",
    date: new Date(Date.now()),
    location: "",
    status: "RESUME_SUBMITTED",
    note: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const onSubmit = async (formData: FormData) => {
    try {
      await axios.post(CONSTANTS.ENDPOINT.APPLICATION_ADD(Number(userId)), formData);
      // setSuccessMessage(
      //   "We sent a confirmation link to your mail address. Please confirm by clicking the link."
      // );
      // setSubmitError("");
    } catch (error) {
      // setSubmitError("There is an incorrect input.");
      // setSuccessMessage("");
    }
  };

  return (
    <>
      <Box margin="auto" textAlign="center" padding={8}>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box sx={style}>
            <Stack spacing={3}>
              <Typography variant="h6" component="h2">
                Add a new application
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    required
                    label="Company Name"
                    placeholder="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    label="Job Title"
                    placeholder="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    label="Applied Date"
                    placeholder="Select Applied Date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    label="Application Status"
                    placeholder="Select Application Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    label="Location"
                    placeholder="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Note"
                    placeholder="Note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      formData.companyName.length === 0 ||
                      formData.jobTitle.length === 0 ||
                      formData.status.length === 0
                    }
                  >
                    Add
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Modal>
        {loading || !data ? (
          <Typography variant="h5" gutterBottom>
            Loading...
          </Typography>
        ) : (
          <Stack spacing={8}>
            <Typography variant="h5" gutterBottom>
              Your Application
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

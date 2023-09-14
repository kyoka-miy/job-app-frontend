import {
  Modal,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { CONSTANTS } from "../constants";
import axios from "axios";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  userId: number;
}

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

export interface FormData {
  companyName: string;
  jobTitle: string;
  date: Date;
  location: string;
  status: string;
  note: string;
}

const AddModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  userId
}) => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    jobTitle: "",
    date: new Date(Date.now()),
    location: "",
    status: "RESUME_SUBMITTED",
    note: "",
  });
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
      setIsModalOpen(false);
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
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={style}>
        <Stack spacing={3}>
          <Typography variant="h6" component="h2">
            Add a New Application
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
  );
};

export default AddModal;

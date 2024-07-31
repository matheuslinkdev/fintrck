import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import colors from "../../styles/colors";

type Reminder = {
  date: Date;
  text: string;
};

const ReminderCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderText, setReminderText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDateReminders, setSelectedDateReminders] = useState<
    Reminder[]
  >([]);

  const onChange = (nextValue: Date) => {
    setValue(nextValue);
  };

  const addReminder = () => {
    if (reminderText) {
      setReminders([...reminders, { date: value, text: reminderText }]);
      setReminderText("");
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      // Adiciona classe se houver lembrete na data
      const hasReminder = reminders.some(
        (reminder) => reminder.date.toDateString() === date.toDateString()
      );
      return hasReminder ? "highlight" : null;
    }
    return null;
  };

  const handleDateClick = (date: Date) => {
    const dateReminders = reminders.filter(
      (reminder) => reminder.date.toDateString() === date.toDateString()
    );
    setSelectedDateReminders(dateReminders);
    setOpen(true);
  };

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        onClickDay={handleDateClick}
      />
      <div style={{display: "none"}}>
        <TextField
          label="Adicionar lembrete"
          variant="outlined"
          value={reminderText}
          onChange={(e) => setReminderText(e.target.value)}
        />
        <Button variant="contained" onClick={addReminder}>
          Adicionar
        </Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" color={colors.common[900]}>
            Lembretes para {value.toDateString()}
          </Typography>
          <ul>
            {selectedDateReminders.length > 0 ? (
              selectedDateReminders.map((reminder, index) => (
                <li key={index}>{reminder.text}</li>
              ))
            ) : (
              <Typography variant="body1" color={colors.common[900]}>
                Nenhum lembrete para esta data.
              </Typography>
            )}
          </ul>
        </Box>
      </Modal>
    </>
  );
};

export default ReminderCalendar;

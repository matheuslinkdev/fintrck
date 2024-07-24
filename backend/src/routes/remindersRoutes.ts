import { Router } from "express";
import {
  createReminder,
  deleteReminder,
  getReminderByID,
  getReminders,
  updateReminder,
} from "../controllers/reminderController";

const router = Router();

router.route("/reminders").get(getReminders).post(createReminder);
router
  .route("/reminders/:id")
  .get(getReminderByID)
  .delete(deleteReminder)
  .put(updateReminder);

export default router;

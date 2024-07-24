import { Request, Response } from "express";
import { ReminderModel } from "../models/reminderModel";

// Criar um novo lembrete
export const createReminder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newReminder = new ReminderModel(req.body);
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o lembrete", error });
  }
};

// Obter todos os lembretes
export const getReminders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reminders = await ReminderModel.find();
    if (reminders.length > 0) {
      res.status(200).json(reminders);
    } else {
      res.status(404).send(`
        <html>
            <head>
                <title>Nada Encontrado</title>
            </head>
            <body>
                <h1>404 - Nada Encontrado</h1>
                <p>Desculpe, mas não encontramos nenhum lembrete.</p>
            </body>
        </html>
      `);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter lembretes", error });
  }
};

// Obter um lembrete por ID
export const getReminderByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const reminder = await ReminderModel.findById(id);

    if (reminder) {
      res.status(200).json(reminder);
    } else {
      res.status(404).json({ message: "Lembrete não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter o lembrete", error });
  }
};

// Atualizar um lembrete
export const updateReminder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedReminder = await ReminderModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (updatedReminder) {
      res.status(200).json(updatedReminder);
    } else {
      res.status(404).json({ message: "Lembrete não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o lembrete", error });
  }
};

// Deletar um lembrete
export const deleteReminder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedReminder = await ReminderModel.findByIdAndDelete(id);

    if (deletedReminder) {
      res.status(200).json({ message: "Lembrete deletado com sucesso" });
    } else {
      res.status(404).json({ message: "Lembrete não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar o lembrete", error });
  }
};

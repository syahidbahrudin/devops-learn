import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve tasks",
    });
  }
});

// GET task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve task",
    });
  }
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await prisma.task.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
      },
    });

    res.json(task);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await prisma.task.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

export default router;
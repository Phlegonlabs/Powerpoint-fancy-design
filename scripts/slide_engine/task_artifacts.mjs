import fs from "node:fs/promises";
import path from "node:path";

export function createTaskState(context = {}) {
  return {
    context,
    tasks: [],
  };
}

export function addTask(state, task) {
  state.tasks.push({
    id: task.id,
    title: task.title,
    status: task.status || "completed",
    details: task.details || [],
    artifacts: task.artifacts || [],
  });
}

function toMarkdown(state) {
  const lines = [
    "# Deck Tasks",
    "",
    `- Scenario: ${state.context.presentationScenario || "unknown"}`,
    `- Quality Tier: ${state.context.qualityTier || "unknown"}`,
    "",
  ];

  for (const task of state.tasks) {
    lines.push(`## ${task.title}`);
    lines.push("");
    lines.push(`- Status: ${task.status}`);
    for (const detail of task.details) {
      lines.push(`- ${detail}`);
    }
    for (const artifact of task.artifacts) {
      lines.push(`- Artifact: ${artifact}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

export async function writeTaskState(styleDir, state) {
  await fs.writeFile(path.join(styleDir, "task-report.json"), `${JSON.stringify(state, null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(styleDir, "task-report.md"), toMarkdown(state), "utf8");
}

export async function loadTaskState(styleDir) {
  const raw = await fs.readFile(path.join(styleDir, "task-report.json"), "utf8");
  return JSON.parse(raw);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function shortenText(value, maxChars) {
  const text = String(value || "").trim();
  if (!text || text.length <= maxChars) return text;
  const splitters = ["。", "；", "，", ".", ";", ","];
  for (const splitter of splitters) {
    const index = text.indexOf(splitter);
    if (index > 12 && index < maxChars) {
      return text.slice(0, index + 1);
    }
  }
  return `${text.slice(0, maxChars - 1).trim()}…`;
}

function shortenPlanCopy(plan) {
  const result = clone(plan);
  if (Array.isArray(result.blocks)) {
    result.blocks = result.blocks.map((block, index) => {
      const limit = index === 1 ? 26 : (index === 2 ? 52 : 64);
      return { ...block, text: shortenText(block.text, limit) };
    });
  }
  if (result.footer) result.footer = shortenText(result.footer, 42);
  if (result.notes) result.notes = result.notes.map((item) => ({ ...item, text: shortenText(item.text, 34) }));
  if (result.commentary) result.commentary = result.commentary.map((item) => ({ ...item, text: shortenText(item.text, 34) }));
  if (result.railItems) result.railItems = result.railItems.map((item) => ({ ...item, text: shortenText(item.text, 30) }));
  if (result.cards) result.cards = result.cards.map((item) => ({ ...item, text: shortenText(item.text, 28) }));
  if (result.pillars) result.pillars = result.pillars.map((item) => ({ ...item, text: shortenText(item.text, 28) }));
  if (result.events) result.events = result.events.map((item) => ({ ...item, text: shortenText(item.text, 26) }));
  if (result.cells) result.cells = result.cells.map((item) => ({ ...item, text: shortenText(item.text, 24) }));
  if (result.steps) result.steps = result.steps.map((item) => ({ ...item, text: shortenText(item.text, 24) }));
  if (result.columns) {
    result.columns = result.columns.map((column) => ({
      ...column,
      points: column.points.slice(0, 3).map((point) => shortenText(point, 22)),
    }));
  }
  if (result.bullets) result.bullets = result.bullets.slice(0, 3).map((item) => shortenText(item, 36));
  return result;
}

export function polishDeckPlans(plans, deckContext) {
  const polishedPlans = [];
  const changes = [];

  for (const originalPlan of plans) {
    let plan = shortenPlanCopy(originalPlan);

    if (deckContext.qualityTier === "public-stage") {
      if (plan.layoutId === "card-constellation" && plan.cards?.length === 4) {
        plan.layoutId = "balanced-quadrants";
        changes.push(`Slide ${plan.index}: switched synthesis layout to balanced quadrants.`);
      }
      if (plan.layoutId === "offset-timeline" && plan.events?.length === 4) {
        plan.layoutId = "momentum-cascade";
        changes.push(`Slide ${plan.index}: switched chronology layout to momentum cascade.`);
      }
      if (plan.layoutId === "chronology-matrix" && plan.cells?.length >= 6) {
        plan.layoutId = "rollout-ladder";
        plan.cells = plan.cells.slice(0, 8);
        changes.push(`Slide ${plan.index}: switched rollout page to ladder layout and capped visible cells at 8.`);
      }
      if (plan.layoutId === "manifesto-wall" && plan.pillars?.length === 4) {
        plan.layoutId = "closing-grid";
        changes.push(`Slide ${plan.index}: switched closing layout to balanced closing grid.`);
      }
      if (plan.metric?.note) {
        plan.metric.note = shortenText(plan.metric.note, 36);
      }
    }

    polishedPlans.push(plan);
  }

  return {
    polishedPlans,
    changes,
  };
}

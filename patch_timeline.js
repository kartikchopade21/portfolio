const fs = require('fs');

let content = fs.readFileSync('components/timeline.tsx', 'utf8');

const originalDescription = `description: 'Building and maintaining end-to-end automation pipelines that eliminate manual intervention, reduce processing time, and scale operations for a global hospitality SaaS product. Global Exposure: Delivered onsite client consultation across UK (London, Edinburgh, Glasgow) and Dar es Salaam, Tanzania — leading data migration calls and translating technical insights into business decisions for enterprise clients.',`;

const newDescription = `description: 'Building and maintaining end-to-end automation pipelines that eliminate manual intervention, reduce processing time, and scale operations for a global hospitality SaaS product.',
    achievements: [
      'Reduced enterprise client onboarding time from ~19 hours to under 1.3 hours via the FastAPI Automation Orchestrator, serving 700+ hotel properties globally.',
      'Replaced an 8-hour manual Excel audit with a scripted reporting pipeline, saving 40+ engineering hours per month and enabling 15+ CI/CD environments to validate simultaneously for 4x QA throughput.',
      'Led onsite SaaS implementations across Tanzania and the UK, earning direct client commendations for technical depth and responsiveness.'
    ],`;

content = content.replace(originalDescription, newDescription);

// Now update TimelineItem component to render achievements if they exist

const originalContentCard = `<p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
          {event.description}
        </p>`;

const newContentCard = `<div className="text-slate-600 dark:text-slate-400 leading-relaxed font-light space-y-4">
          <p>{event.description}</p>
          {event.achievements && (
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {event.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>`;

content = content.replace(originalContentCard, newContentCard);

// To avoid TypeScript error we also need to change the type of timelineEvents or how we define `TimelineItem` props
// Actually, `typeof timelineEvents[0]` will automatically infer the optional `achievements` array if we add it to the first item.

fs.writeFileSync('components/timeline.tsx', content);

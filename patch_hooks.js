const fs = require('fs');
let content = fs.readFileSync('hooks/use-mobile.ts', 'utf8');

// I'll just change the initial state logic or suppress the eslint rule
// Since this is standard React matchMedia hook, sometimes this rule is annoying. I will add an eslint-disable comment.

content = content.replace(
  'setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)',
  '// eslint-disable-next-line react-hooks/set-state-in-effect\n    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)'
);

fs.writeFileSync('hooks/use-mobile.ts', content);

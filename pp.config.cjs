const desktopSections = [
  {section: 'hero', misMatchThreshold: 0.9},
  {section: 'about', misMatchThreshold: 1.1},
  {section: 'programs', misMatchThreshold: 0.9},
  {section: 'grant', misMatchThreshold: 0.9},
  {section: 'news', misMatchThreshold: 0.9},
  {section: 'FAQ', misMatchThreshold: 1.1},
  {section: 'reviews', misMatchThreshold: 0.9},
  {section: 'contacts', misMatchThreshold: 0.9},
  {section: 'form', misMatchThreshold: 0.9},
  {section: 'footer', misMatchThreshold: 1.0},
]

const tabletSections = [
  {section: 'hero', misMatchThreshold: 0.9},
  {section: 'about', misMatchThreshold: 0.9},
  {section: 'programs', misMatchThreshold: 0.8},
  {section: 'grant', misMatchThreshold: 0.7},
  {section: 'news', misMatchThreshold: 0.9},
  {section: 'FAQ', misMatchThreshold: 1.4},
  {section: 'reviews', misMatchThreshold: 0.8},
  {section: 'contacts', misMatchThreshold: 1.2},
  {section: 'form', misMatchThreshold: 0.9},
  {section: 'footer', misMatchThreshold: 1.2}
]

const mobileSections = [
  {section: 'hero', misMatchThreshold: 2.3},
  {section: 'about', misMatchThreshold: 1.8},
  {section: 'programs', misMatchThreshold: 0.9},
  {section: 'grant', misMatchThreshold: 2.3},
  {section: 'news', misMatchThreshold: 0.9},
  {section: 'FAQ', misMatchThreshold: 1.8},
  {section: 'reviews', misMatchThreshold: 2.6},
  {section: 'contacts', misMatchThreshold: 1.3},
  {section: 'form', misMatchThreshold: 0.9},
  {section: 'footer', misMatchThreshold: 1.8}
]

const VIEWPORTS = {
  'desktop': {"label": "desktop", "width": 1440, "height": 800},
  'tablet': {"label": "tablet", "width": 768, "height": 1024},
  'mobile': {"label": "mobile", "width": 320, "height": 480}
};

const URL = 'http://localhost:3000/index.html';
const REFERENCE_URL = './figma/index.html';

function generateScenario(section, misMatchThreshold, viewport) {
  return {
    "label": `${section}`,
    "url": URL,
    "referenceUrl": REFERENCE_URL,
    selectors: [`[data-test="${section}"]`],
    misMatchThreshold: misMatchThreshold || 5,
    requireSameDimensions: true,
    delay: 500,
    ...viewport ? {"viewports": [VIEWPORTS[viewport]]} : {}
  };
}

module.exports = {
  "id": "internship test-pp",
  "onReadyScript": "onReady.cjs",
  "onBeforeScript": "onBefore.cjs",
  "viewports": [
    {
      "label": "mobile",
      "width": 320,
      "height": 480,
    },
    {
      "label": "tablet",
      "width": 768,
      "height": 1024,
    },
    {
      "label": "desktop",
      "width": 1440,
      "height": 800,
    }
  ],
  "resembleOutputOptions": {
    "ignoreAntialiasing": true,
    "errorType": "movementDifferenceIntensity",
    "transparency": 0.3,
    scaleToSameSize: false
  },
  "scenarios": [
    ...desktopSections.map(({section, misMatchThreshold}) => generateScenario(section, misMatchThreshold, 'desktop')),
    ...tabletSections.map(({section, misMatchThreshold}) => generateScenario(section, misMatchThreshold, 'tablet')),
    ...mobileSections.map(({section, misMatchThreshold}) => generateScenario(section, misMatchThreshold, 'mobile')),
  ],
  fileNameTemplate: '{scenarioLabel}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "bitmaps_reference/test-pp",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "engine_scripts",
    "html_report": "backstop_data/html_report",
    "json_report": "backstop_data/json_report",
  },
  "report": ["browser", "json"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"],
    "gotoParameters": {"waitUntil": ["load", "networkidle0"], timeout: 30000},
  },
  "asyncCaptureLimit": 10,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}

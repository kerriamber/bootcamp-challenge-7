// small subset of licenses from
// https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository#searching-github-by-license-type'
// keys:
// - name: the full name of the license, used in the license section of the README and the license choosing prompt
// - keyword: the keyword to display in the badge (pulled from the github page above)
// - url: the URL of the license text, used in the license choosing prompt and the license section in the README
const LICENSES = [
  {
    name: 'Apache 2.0',
    keyword: 'Apache-2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
  },
  {
    name: 'ISC',
    keyword: 'ISC',
    url: 'https://opensource.org/license/isc-license-txt'
  },
  {
    name: 'GNU General Public License v3.0',
    keyword: 'GPL-3.0',
    url: 'https://www.gnu.org/licenses/gpl-3.0.en.html#license-text'
  },
  {
    name: 'MIT License',
    keyword: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  },
  {
    name: 'Mozilla Public License 2.0',
    keyword: 'MPL-2.0',
    url: 'https://www.mozilla.org/en-US/MPL/2.0/'
  },
  {
    name: 'Unlicense',
    keyword: 'Unlicense',
    url: 'https://unlicense.org/'
  },
  {
    name: 'No license',
    keyword: '',
    url: ''
  }
];

/**
 * hacky-hack because inquirer's `select()` only returns a string (the keyword in this case) and
 * I need to get the URL and full name out of the LICENCES array (declared above)
 * @param {string} licenseKey 
 * @returns object
 */
function getLicenseFromKey(licenseKey) {
  return LICENSES.filter(license => license.keyword === licenseKey)[0];
}

/**
 * Render a markdown image link for the license, using shields.io
 * @param {string} licenseKey 
 * @returns string
 */
function renderLicenseBadge(licenseKey) {
  if (!licenseKey) {
    return '';
  }

  const license = getLicenseFromKey(licenseKey);
  // parse the license keyword so it appears correctly in the badge from shields.io
  // see https://shields.io/badges
  const badgeText = licenseKey.replaceAll('_', '__')
    .replaceAll(' ', '_')
    .replaceAll('-', '--');

  return `![${license.name}](https://img.shields.io/badge/License-${badgeText}-red?style=plastic)`;
}

/**
 * Return a markdown link for the provided license's full text
 * @param {sring} licenseKey 
 * @returns string
 */
function renderLicenseLink(licenseKey) {
  if (!licenseKey) {
    return '';
  }

  const license = getLicenseFromKey(licenseKey);

  return `[${license.name}](${license.url})`;
}

/**
 * Return the markdown for the `License` section in the README
 * @param {string} licenseKey 
 * @returns string
 */
function renderLicenseSection(licenseKey) {
  if (!licenseKey) {
    return '';
  }

  return `## Lincense\nThis license uses the ${renderLicenseLink(licenseKey)} license.`;
}

/**
 * Generate the full markdown for the README
 * @param {object} data 
 * @returns string
 */
function generateMarkdown(data) {
  return `# ${data.title}
${renderLicenseBadge(data.license)}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [How to Contribute](#contributing)
${data.license !== '' ? '- [License](#license)' : ''}
- [Tests](#tests)
- [Questions?](#questions)

## Description
${data.desc}

## Installation
${data.install}

## Usage
${data.usage}

## Contributing
${data.contrib}

${renderLicenseSection(data.license)}

## Tests
${data.test}

## Questions
You can find my GitHub profile [here](https://github.com/${data.githubUser}).
 
You can contact me at [${data.email}](mailto:${data.email}) if you have any further questions.`;
}

export { LICENSES, generateMarkdown };

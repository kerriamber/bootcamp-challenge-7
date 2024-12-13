import { input, select } from '@inquirer/prompts';
import { writeFile } from 'fs/promises';
import { generateMarkdown, LICENSES } from './utils/generateMarkdown.js';

/**
 * Write the given data to a file with the given filename.
 * @param {string} fileName 
 * @param {string} data 
 */
function writeToFile(fileName, data) {
    writeFile(fileName, data, 'utf8');
}

/**
 * Ensures a string isn't empty.
 * @param {string} answer 
 * @returns {boolean}
 */
function validateNotEmpty(answer) {
    return answer !== '';
}

/**
 * Initialize the app and get user input, then write the generated markdown to README.md.
 * This function must be async due to using `await` for the prompts.
 */
async function init() {
    // Turn the LICENSES array into a choices array that `@inquirer/select` will understand.
    const licenseChoices = LICENSES.map((license) => {
        return {
            name: license.name,
            value: license.keyword,
            description: license.url
        }
    });

    const data = {
        title: await input({ message: 'Enter your project title: ', validate: validateNotEmpty }),
        desc: await input({ message: 'Enter a description for your project: ', validate: validateNotEmpty }),
        install: await input({ message: 'Enter installation instructions for your project: ', validate: validateNotEmpty }),
        usage: await input({ message: 'Enter usage information for your project: ', validate: validateNotEmpty }),
        contrib: await input({ message: 'Enter contribution guidelines: ', validate: validateNotEmpty }),
        test: await input({ message: 'Enter test instructions for your project: ', validate: validateNotEmpty }),
        license: await select({
            message: 'Choose a license for your project:',
            choices: licenseChoices
        }),
        githubUser: await input({ message: 'Enter your GitHub username: ', validate: validateNotEmpty }),
        email: await input({
            message: 'Enter your email address: ',
            // Make sure the email *is* an email address. More or less.
            // I'm not using something to fully test for RFC 5322 compliance in a homework assignment
            validate: (email) => /\S+@\S+\.\S+/.test(email)
        })
    }

    const markdown = generateMarkdown(data);

    writeToFile('README.md', markdown);
}

// Function call to initialize app
init();

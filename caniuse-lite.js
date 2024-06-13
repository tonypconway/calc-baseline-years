import * as lite from 'caniuse-lite';

const browsers = lite.agents;

// console.log(agents);

const yearMappings = {}
const endYear = new Date().getFullYear();

const baselineAgents = [
    "edge",
    "firefox",
    "chrome",
    "safari",
    "ios_saf",
    "and_chr",
    "and_ff",
]


for (let year = 2016; year <= endYear; year++) {
    yearMappings[year] = {};
    let currentYear = Math.floor(new Date(`${year}.01.01`).getTime() / 1000);
    let nextYear = Math.floor(new Date(`${year+1}.01.01`).getTime() / 1000);
    baselineAgents.forEach(browser => {

        let arrayOfVersions = new Array();

        // console.log(year, browser);
        Object.entries(browsers[browser].release_date).filter(([version,release_epoch])=>{
            if (release_epoch >= currentYear && release_epoch < nextYear) {
                return true;
            }
            return false
        }).forEach(data=>{
            arrayOfVersions.push({version: data[0], release_epoch: data[1]});
        });

        let finalVersion = arrayOfVersions.sort((a,b)=>{a.release_epoch - b.release_epoch}).pop();

        yearMappings[year][browser] = finalVersion != null
        ? finalVersion
        : null;

    })
}

console.log(JSON.stringify(yearMappings, null, '  '))

// console.log(yearMappings); 
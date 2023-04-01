#!/usr/bin/env node

// https://github.com/tj/commander.js/
const program = require('commander')
const App = require('./')

program
  .command('download')
  .description('Downloads data from specific URL and saves in appropriate location in project.')
  .option('-p, --preset <string>', 'Manually set preset.')
  .argument('<url>', 'The URL to get the data from.')
  .action(
  /**
   * @param {string} url 
   * @param {any} params
   */
  function (url, params) {
    console.debug('download', { url, params })
    const app = new App()
    app.download({
        url,
        preset: params.preset,
    })
  })

  // Process Commands
program.parse(process.argv)

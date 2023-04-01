const fs = require('fs-extra')
const path = require('path')
const AppSettings = /** @type {Settings} */ (require('./settings.json'))

/**
 * @typedef {'types' | 'schema' | 'data'} Preset
 * @typedef {{ extensions: Record<string, Preset>; presets: Record<Preset, string>; defaultPreset: Preset }} Settings
 */

class App {
    /**
     * @param {{ url: string; preset?: Preset }} settings 
     */
    async download(settings) {
        console.debug('download', { settings })
        const url = settings.url
        const data = await (await fetch(url)).text()
        const preset = settings.preset || getURLPreset(url)
        const { fileName, extension } = getURLParts(url)
        const template = AppSettings.presets[preset]
        const downloadLocation = path.resolve(process.cwd(), template.replace('[FILENAME]', fileName).replace('[EXTENSION]', extension)) // Relative to where executed.
        // console.debug({ cwd: process.cwd(), url, fileName, extension, preset, template, downloadLocation }); return; // DEBUG
        await fs.ensureFile(downloadLocation) // Better to do ensure directory, BUT unnecessary parsing is not worth it.
        await fs.writeFile(downloadLocation, data, {  })
    }
}

module.exports = App

/**
 * @param {string} url
 * @return {Preset}
 */
function getURLPreset(url) {
    for (let extension in AppSettings.extensions) {
        const preset = AppSettings.extensions[extension]
        if (url.endsWith(extension)) {
            return preset
        }
    }
    return AppSettings.defaultPreset
}

/**
 * @param {string} url 
 */
function getURLParts(url) {
    const lastRoute = url.split('/').pop() || ''
    const parts = lastRoute.split('.')
    const fileName = parts.shift() || 'UNKNOWN'
    const extension = (parts.length > 0) ? `.${parts.join('.')}` : ''

    return {
        fileName, extension
    }
}

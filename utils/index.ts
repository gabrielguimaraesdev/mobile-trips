export function createShortname(name: string) {
    if (!name) return name 
    const splitName = name.split(' ')
    const hasSecondLetter = splitName.length > 1
    const firstLetter = splitName[0][0]
    const secondeLetter = hasSecondLetter ? splitName[splitName.length-1][0] : ''
    return firstLetter + secondeLetter
}
export const geraNumero = () => {
    const max: number = 10
    const min: number = 1
    return Math.floor(Math.random() * (max - min + 1)) + min
}
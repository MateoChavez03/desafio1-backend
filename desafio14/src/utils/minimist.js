import minimist from "minimist"

const args = minimist(process.argv.slice(2), {
    alias: {p: "port", m: "mode"}
})

export default args
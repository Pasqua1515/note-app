// deals with data:  json
let notes = require("../data/note")
const { v4: uuidv4 } = require("uuid")

const { writeDatatoFile } = require("../utils")

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(notes)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const note = notes.find((j) => j.id === id)
        resolve(note)
    })
}


function create(note) {
    return new Promise((resolve, reject) => {
        const newNote = { id: uuidv4(), ...note }
        notes.push(newNote)
        writeDatatoFile("./data/note.json", notes)
        resolve(newNote)
    })
}

function update(id, note) {
    return new Promise((resolve, reject) => {
        const index = notes.findIndex((p) => p.id === id)
        notes[index] = { id, ...note }

        writeDatatoFile("./data/note.json", notes)
        resolve(notes[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        notes = notes.filter((p) => p.id !== id)
        notes[index] = { id, ...note }

        writeDatatoFile("./data/note.json", notes)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
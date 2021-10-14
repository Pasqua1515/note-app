// controls what the route is doing status etc... interacts with model

const { allowedNodeEnvironmentFlags } = require("process")
const Allnotes = require("../models/notesModel")

const { getPostData } = require("../utils")

//gets all note
// GET /api/products
async function getNotes(req, res) {
    try {// await because findAll function returns a promise
        const notes = await Allnotes.findAll()

        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(notes))
    } catch (error) {
        console.log(error)
    }
}


//gets one note
// GET /api/product/:id
async function getN(req, res, id) {
    try {
        const n = await Allnotes.findById(id)

        if (!n) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: "Product not found" }))
        } else {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(n))
        }


    } catch (error) {
        console.log(error)
    }
}

//create a  note
// POST 
async function creatNote(req, res) {
    try {
        const body = await getPostData(req)

        const { title, content } = JSON.parse(body)

        const note = {
            title,
            content
        }

        const newNote = await Allnotes.create(note) // await cause .create gives us a promise


        res.writeHead(201, { "Content-Type": "application/json" })
        return res.end(JSON.stringify(newNote))
    } catch (error) {
        console.log(error)
    }
}


//update a  note
// PUT to ID
async function updateNote(req, res, id) {
    try {

        const note = await Allnotes.findById(id)

        if (!note) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: "Product not found" }))
        } else {
            const body = await getPostData(req)

            const { title, content } = JSON.parse(body)

            const noteData = {
                title: title || note.title,
                content: content || note.content
            }

            const updateNote = await Allnotes.update(id, noteData)


            res.writeHead(200, { "Content-Type": "application/json" })
            return res.end(JSON.stringify(updateNote))
        }

    } catch (error) {
        console.log(error)
    }
}

//dlete all note
// DELETE /api/notes
async function deleteNote(req, res, id) {
    try {
        const n = await Allnotes.findById(id)

        if (!n) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: "Product not found" }))
        } else {
            await Allnotes.remove(id)
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: `Product ${id} removed` }))
        }


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getNotes,
    getN,
    creatNote,
    updateNote,
    deleteNote
}
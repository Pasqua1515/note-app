const http = require("http")
const { getNotes, getN, creatNote, updateNote, deleteNote } = require("./controllers/notescontroller")

const server = http.createServer((req, res) => {
    //res.statusCode = 200 // everything is ok
    if (req.url === "/api/note" && req.method === "GET") {
        getNotes(req, res)

        // if  /api/notes in the url doesnt exist then it will hang
    } else if (req.url.match(/\/api\/note\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[3]  //    api/notes/1 
        getN(req, res, id)
    } else if (req.url === "/api/note" && req.method === "POST") {
        creatNote(req, res)
    } else if (req.url.match(/\/api\/note\/([0-9]+)/) && req.method === "PUT") {
        const id = req.url.split("/")[3]
        updateNote(req, res, id)
    } else if (req.url.match(/\/api\/note\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split("/")[3]
        deleteNote(req, res, id)
    } else {// 404 notfound
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "Route not found" }))
    }


})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
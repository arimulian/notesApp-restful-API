import { nanoid } from "nanoid";
import { notes } from "./notes.js";

/**
 * Create function addNotes
 * @param {*} request 
 * @param {*} h 
 */
const addHandler = (request, h) => {
     const { title, tags, body } = request.payload;
     const id = nanoid(15);
     const createdAt = new Date().toISOString();
     const updateAt = createdAt;

     const newNotes = { id, title, tags, body, createdAt, updateAt };
     notes.push(newNotes);
     const isSuccess = notes.filter((note) => note.id === id).length > 0;
     if (isSuccess) {
          const response = h.response({
               status: 'success',
               message: 'success add data notes',
               data: {
                    noteId: id,
               }
          });
          response.code(201);
          return response;
     }
     const response = h.response({
          status: 'fail',
          message: 'fail to add data',
          data: null
     });
     response.code(400);
     return response;
};

const getAllNotesHandler = () => ({
     status: 'success',
     data: {
          notes,
     }
});

const getNotesByIdHandler = (request, h) => {
     const { id } = request.params;
     const note = notes.filter((note) => note.id === id)[0];
     if (note !== undefined) {
          return {
               status: 'success',
               data: {
                    note,
               },
          };
     }

     const response = h.response({
          status: 'fail',
          message: 'Catatan tidak ditemukan',
     });
     response.code(404);
     return response;
};

const editNotesByIdHandler = (request, h) => {
     const { id } = request.params;
     const { title, tags, body } = request.payload;
     const updatedAt = new Date().toISOString();

     const index = notes.findIndex((note) => note.id === id);

     if (index !== -1) {
          notes[index] = { ...notes[index], title, tags, body, updatedAt };
          const response = h.response({
               status: 'success',
               message: 'update successfully'
          });
          response.code(200);
          return response;
     }

     const response = h.response({
          status: 'fail',
          message: 'id is missing'
     });

     response.code(401);
     return response;
};

const deleteNotes = (request, h) => {
     const { id } = request.params;
     const index = notes.findIndex((note) => note.id === id);
     const remove = notes.splice(index, 1);
     const data = { ...remove };
     if (data) {
          const response = h.response({
               status: 'success',
               message: 'deleting success'
          });
          response.code(201);
          return response;
     }
     const response = h.response({
          status: 'fail',
          message: 'not Success'
     });

     response.code(404);
     return response;
};

export { addHandler, getAllNotesHandler, getNotesByIdHandler, editNotesByIdHandler, deleteNotes };

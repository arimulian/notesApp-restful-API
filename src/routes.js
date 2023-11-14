import { addHandler, deleteNotes, editNotesByIdHandler, getAllNotesHandler, getNotesByIdHandler } from "./handler.js";
export const routes = [
     {
          method: 'POST',
          path: '/notes',
          handler: addHandler,
     },
     {
          method: 'GET',
          path: '/notes',
          handler: getAllNotesHandler,
     },
     {
          method: 'GET',
          path: '/notes/{id}',
          handler: getNotesByIdHandler
     },
     {
          method: 'PUT',
          path: '/notes/{id}',
          handler: editNotesByIdHandler
     },
     {
          method: 'DELETE',
          path: '/notes/{id}',
          handler: deleteNotes,
     }
];


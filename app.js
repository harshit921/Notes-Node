const fs=  require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions= {
    describe: 'Title of Note',
    demand: true,
    alias: 't'

};
const bodyOptions = {
  describe: 'Body of Note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add','Add a new Note', {title: titleOptions,
  body:bodyOptions,
  })
  .command('list', 'List All notes' , {
      list: {

      }
  })
  .command('read', 'List All notes' , {
    title: {
      describe: 'Title of Note',
      demand: true,
      alias: 't'
      }
  })
  .command('remove', 'Remove A note' , {
    title: titleOptions,
   })
.help()
.argv;

var command = argv._[0];

switch (command) {
  case 'add': {
    var dnote = notes.addNote(argv.title , argv.body);
      if(dnote)
      {
      console.log("Note is saved");
      notes.logNote(dnote);
      }
      else console.log("Already Taken Note");

  };
      break;
  case 'list':{
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
  }
        break;
  case 'read':
  {
    var note = notes.getNote(argv.title);
    if(note)
    {
      console.log("note Found");
      notes.logNote(note);
    }
    else console.log("Note not found");

  };
      break;
  case 'remove':
    {
        var noteRemoved = notes.removeNote(argv.title);
        var message = noteRemoved ? 'Note was Removed' : 'Note not found';
        console.log(message) ;
    }
      break;
  default: console.log('Command not recognized');
}

import multer from 'multer'
import path from 'path'
import os from 'os';



const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000000, files: 2 },
  });


export default upload;
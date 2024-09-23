import express from 'express';
import { upload } from '../middleware/fileUpload';

const router = express.Router();


router.post('/upload', upload.single('file'), (req, res) => {
    try {
      console.log(req.file);
      res.status(200).json({
        message: 'Archivo subido exitosamente',
        file: req.file
      });
    } catch (err: any) { 
      res.status(500).json({
        message: 'Error al subir archivo',
        error: err.message  
      });
    }
  });
  
export default router;

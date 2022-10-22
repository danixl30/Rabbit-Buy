import { diskStorage } from 'multer'
import { join } from 'path'
import { Express } from 'express'

const imageFilter = (
    _: Request,
    file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void,
) => {
    if (!Boolean(file.mimetype.match(/(jpg|jpeg|png)/))) callback(null, false)
    callback(null, true)
}
export const configImageMulter = {
    fileFilter: imageFilter,
    storage: diskStorage({
        destination: join(__dirname, '../../../../public/uploads'),
        filename: (_, file, callback) =>
            callback(
                null,
                Date.now() + '.' + file.originalname.split('.').at(-1),
            ),
    }),
}

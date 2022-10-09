import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { ImageStorage } from 'src/core/application/storage/images/image.storage'
import { DeleteImageOptions } from 'src/core/application/storage/images/types/delete.options'
import { SaveImageOptions } from 'src/core/application/storage/images/types/save.options'
import { ImageSaved } from 'src/core/application/storage/images/types/saved'

cloudinary.config({
    api_key: '',
    api_secret: '',
})

@Injectable()
export class CloudinaryImageStorage implements ImageStorage {
    async save(options: SaveImageOptions): Promise<ImageSaved> {
        const data = await cloudinary.uploader.upload(options.path)
        return {
            url: data.url,
        }
    }

    async delete(options: DeleteImageOptions): Promise<ImageSaved> {
        await cloudinary.uploader.destroy(options.url, {
            type: 'url2png',
        })
        return {
            url: options.url,
        }
    }
}

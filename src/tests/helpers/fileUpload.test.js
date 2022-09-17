import 'setimmediate';
import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'zseuz', 
    api_key: '747134432631452', 
    api_secret: 'FlzcdzrjnoaAvlRt2tIBTM_8AM4' 
});

describe('Test in fileUpload', () => {
    test('Should upload a file and return the URL', async () => {
        const img= 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch(img);
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.png','');

        cloudinary.api.delete_resources(imageId, {}, () => {
             done();
         });
    },20000)
    test('debe de retornar un error', async() => {

        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect( url ).toBe( null );

        
    })
    
})
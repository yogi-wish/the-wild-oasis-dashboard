import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase.from('cabins')
        .select('*')


    if (error) {
        console.log(error);
        throw new Error('cabin could not be loaded');
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startWith?.(supabase);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

    // https://wzwnumuaknyeywkrgdnu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;


    // creating/edit cabin
    let query = supabase.from('cabins');

    // create
    if (!id) query.insert([{ ...newCabin, image: imagePath }])

    // edit
    if (id) query.update({ ...newCabin, image: imagePath })
        .eq('id', id)

    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error('cabin could not be created');
    }


    // upload images
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)


    // delete the cabin if there was an error in uploading image
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id)
        console.error(storageError);
        throw Error('Cabin image could not be uploaded and cabin was not created')
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error);
        throw new Error('cabin could not be deleted');
    }
    return data;
}
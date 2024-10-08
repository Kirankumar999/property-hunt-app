'use server';
import { getUserSession } from "@/utils/getUserSession";
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function addProperty(formData) {
    await connectDB();
    const userSession = await getUserSession();
    console.log(userSession);
    if (!userSession || !userSession.userId) {
        throw new Error('no valid user');
    }
    const {userId} = userSession;

    const images = formData.getAll('images').filter((image) => image.name !== '').map((image) => image.name);
    const propertyData = {
        owner: userId,
        name : formData.get('name'),
        type : formData.get('type'),
        description : formData.get('description'),
        name : formData.get('name'),
        location : {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode')
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities: formData.getAll('amenities'),
        rates: {
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly')
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
        images
    };

    console.log(propertyData);
    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');
    redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
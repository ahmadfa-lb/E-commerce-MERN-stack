// import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import productModel from "../models/productModel.js"
import supabase from '../config/supabase.js'

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, discount, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // Upload images to Supabase Storage
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                const fileExt = item.originalname.split('.').pop();
                const fileName = `products/${uuidv4()}.${fileExt}`;
                // Read file as buffer instead of stream
                const fileBuffer = fs.readFileSync(item.path);

                const { data, error } = await supabase.storage
                    .from('products')
                    .upload(fileName, fileBuffer, {
                        contentType: item.mimetype,
                        upsert: true,
                    });

                fs.unlinkSync(item.path);

                if (error) {
                    throw error;
                }

                // FIX: Use publicUrl instead of publicURL
                const { publicUrl } = supabase.storage.from('products').getPublicUrl(fileName).data;
                return publicUrl;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            discount: Number(discount) || 0,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        
        // Delete images from Supabase Storage if they exist
        if (product && product.image && product.image.length > 0) {
            await Promise.all(product.image.map(async (imageUrl) => {
                try {
                    // Extract the file path from the URL
                    // The URL format is typically: https://[project-ref].supabase.co/storage/v1/object/public/products/[filename]
                    const urlParts = imageUrl.split('/');
                    const fileName = urlParts[urlParts.length - 1];
                    const folderName = urlParts[urlParts.length - 2];
                    const filePath = `${folderName}/${fileName}`;
                    
                    // Delete the file from Supabase
                    const { error } = await supabase.storage
                        .from('products')
                        .remove([filePath]);
                        
                    if (error) {
                        console.log(`Failed to delete image: ${error.message}`);
                    }
                } catch (err) {
                    console.log(`Failed to delete image: ${err.message}`);
                }
            }));
        }
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ... existing code ...

// function for updating product
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, discount, category, subCategory, sizes, bestseller, keepImages } = req.body;
        // Get existing product
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Handle images
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const newImages = [image1, image2, image3, image4].filter((item) => item !== undefined);
        let keepImagesArray = [];
        
        try {
            keepImagesArray = JSON.parse(keepImages);
        } catch (error) {
            console.log("Error parsing keepImages:", error);
            keepImagesArray = [];
        }

        // Upload new images to Supabase Storage
        let newImagesUrl = [];
        if (newImages.length > 0) {
            newImagesUrl = await Promise.all(
                newImages.map(async (item) => {
                    const fileExt = item.originalname.split('.').pop();
                    const fileName = `products/${uuidv4()}.${fileExt}`;
                    // Read file as buffer instead of stream
                    const fileBuffer = fs.readFileSync(item.path);

                    const { data, error } = await supabase.storage
                        .from('products')
                        .upload(fileName, fileBuffer, {
                            contentType: item.mimetype,
                            upsert: true,
                        });

                    // Safely delete the temp file
                    try {
                        if (fs.existsSync(item.path)) {
                            fs.unlinkSync(item.path);
                        }
                    } catch (unlinkError) {
                        console.log("Warning: Could not delete temp file:", unlinkError.message);
                        // Continue execution even if temp file deletion fails
                    }

                    if (error) {
                        throw error;
                    }

                    const { publicUrl } = supabase.storage.from('products').getPublicUrl(fileName).data;
                    return publicUrl;
                })
            );
        }

        // Fix for the image replacement issue - preserve existing images and add new ones
        // Start with the existing images
        const finalImages = [...keepImagesArray];
        
        // Add new images to any empty slots or at the end
        for (let i = 0; i < newImagesUrl.length; i++) {
            // Find the first empty slot or add to the end
            const emptyIndex = finalImages.findIndex(img => !img);
            if (emptyIndex !== -1) {
                finalImages[emptyIndex] = newImagesUrl[i];
            } else {
                finalImages.push(newImagesUrl[i]);
            }
        }

        // Update product data
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            discount: Number(discount) || 0,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: finalImages.filter(img => img !== undefined && img !== null),
        };

        // Update the product in the database
        await productModel.findByIdAndUpdate(id, productData);

        res.json({ success: true, message: "Product Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { listProducts, addProduct, removeProduct, singleProduct, updateProduct };

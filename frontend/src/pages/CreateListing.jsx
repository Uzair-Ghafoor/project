import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.users);
  console.log(currentUser);
  const [ImageUploadSuccess, setImageUploadSuccess] = useState('');
  const [imageUploadError, setImageUploadError] = useState('');
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    furnished: false,
    offer: false,
    parking: false,
  });
  console.log(formData);
  const uploadImages = () => {
    const fileSize = 2 * 1024 * 1024;
    if (files.size < fileSize) {
      return setImageUploadError('image upload failed (2mb max)');
    }
    if (files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(uploadFile(files[i]));
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadSuccess('images uploaded successfully.');
          })
          .catch((error) => {
            setImageUploadError('image upload failed (2mb max)');
          });
      }
    } else {
      setImageUploadError('You can only upload a max of 6 images');
    }
  };

  const uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === 'furnished' ||
      e.target.id === 'parking' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    if (e.target.id === 'discountedPrice') {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // /api/v1/listing/create
    try {
      if (formData.imageUrls.length < 1) {
        return setImageUploadError('Please upload atleast 1 image.');
      }
      if (Number(formData.regularPrice) < Number(formData.discountedPrice)) {
        return setImageUploadError(
          'discounted Price must be less than regular price'
        );
      }
      const res = await axios.post('/api/v1/listing/create', {
        ...formData,
        userRef: currentUser._id,
      });
      toast.success('listing created.');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=' p-4'>
      <h1 className=' text-3xl font-semibold text-center my-3'>
        Create a listing
      </h1>
      {/* parent */}
      <form onSubmit={handleSubmit} className=' max-w-3xl mx-auto'>
        <div className=' flex flex-col sm:flex-row gap-4'>
          {/* child */}
          <div className=' flex flex-col flex-1 gap-y-4'>
            <input
              type='text'
              id='name'
              placeholder='Name'
              onChange={handleChange}
              value={formData.name}
              className=' input input-bordered input-md w-96'
            />
            <textarea
              type='textarea'
              placeholder='Description'
              id='description'
              onChange={handleChange}
              value={formData.description}
              className=' textarea textarea-bordered textarea-md w-96'
            />
            <input
              type='text'
              id='address'
              placeholder='Address'
              onChange={handleChange}
              value={formData.address}
              className=' input input-bordered input-md w-96'
            />
            <div className=' flex gap-4 flex-wrap'>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                  className='checkbox checkbox-primary'
                />
                <p>Sell</p>
              </div>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='rent'
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                  className='checkbox checkbox-primary'
                />
                <p>Rent</p>
              </div>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='parking'
                  checked={formData.parking}
                  onChange={handleChange}
                  className='checkbox checkbox-primary'
                />
                <p>Parking Spot</p>
              </div>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='furnished'
                  checked={formData.furnished}
                  onChange={handleChange}
                  className='checkbox checkbox-primary'
                />
                <p>Furnished</p>
              </div>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='offer'
                  onChange={handleChange}
                  checked={formData.offer}
                  className='checkbox checkbox-primary'
                />
                <p>Offer</p>
              </div>
            </div>
            <div className=' flex flex-wrap gap-3'>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bedrooms'
                  placeholder='Beds'
                  min={1}
                  max={10}
                  defaultValue={1}
                  onChange={handleChange}
                  value={formData.bedrooms}
                  className=' p-3 w-20 rounded-lg border-gray-400'
                />
                <p>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bathrooms'
                  placeholder='Baths'
                  min={1}
                  max={5}
                  onChange={handleChange}
                  value={formData.bathrooms}
                  className=' p-3 w-20 rounded-lg border-gray-400'
                />
                <p>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='regularPrice'
                  placeholder='Regular Price'
                  min={50}
                  max={10000000}
                  onChange={handleChange}
                  value={formData.regularPrice}
                  className=' p-3 w-40 rounded-lg border-gray-400'
                />
                <p>Regular Price</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountedPrice'
                  placeholder='Discounted Price'
                  onChange={handleChange}
                  value={formData.discountedPrice}
                  className=' p-3 w-40 rounded-lg border-gray-400'
                />
                <p>Discounted Price</p>
              </div>
            </div>
          </div>
          {/* child */}
          <div className=' flex-1 flex flex-col gap-4'>
            <div className=' flex gap-2 items-center'>
              <span className=' font-semibold'>Images:</span>
              <p>The first image will be the cover(max 6)</p>
            </div>
            <div className=' flex gap-2'>
              <input
                type='file'
                onChange={(e) => setFiles(e.target.files)}
                accept='images/*'
                multiple
                className=' border p-3 border-gray-600'
              />

              <button
                type='button'
                onClick={uploadImages}
                className=' p-3 border border-green-800 text-green-800'
              >
                Upload
              </button>
            </div>
            {imageUploadError && (
              <p className=' text-red-500'>{imageUploadError}</p>
            )}
            {ImageUploadSuccess && (
              <p className=' text-green-500'>{ImageUploadSuccess}</p>
            )}

            <button className=' bg-slate-700 p-3 rounded-lg  text-white mt-7'>
              Create Listing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';

const CreateListing = () => {
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
    discountedPrice: '',
    furnished: false,
    offer: false,
    parking: false,
  });
  console.log(formData);
  const uploadImages = () => {
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
          })
          .catch((error) => {});
      }
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

  return (
    <div className=' p-4'>
      <h1 className=' text-3xl font-semibold text-center my-3'>
        Create a listing
      </h1>
      {/* parent */}
      <form className=' max-w-3xl mx-auto'>
        <div className=' flex flex-col sm:flex-row gap-4'>
          {/* child */}
          <div className=' flex flex-col flex-1 gap-y-4'>
            <input
              type='text'
              id='name'
              placeholder='Name'
              className=' input input-bordered input-md w-96'
            />
            <textarea
              type='text'
              placeholder='Description'
              id='description'
              className=' textarea textarea-bordered textarea-md w-96'
            />
            <input
              type='text'
              id='address'
              placeholder='Address'
              className=' input input-bordered input-md w-96'
            />
            <div className=' flex gap-4 flex-wrap'>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className='checkbox checkbox-primary'
                />
                <p>Sell</p>
              </div>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className='checkbox checkbox-primary'
                />
                <p>Rent</p>
              </div>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className='checkbox checkbox-primary'
                />
                <p>Parking Spot</p>
              </div>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className='checkbox checkbox-primary'
                />
                <p>Furnished</p>
              </div>
              <div className=' flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sale'
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
                  className=' p-3 w-20 rounded-lg border-gray-400'
                />
                <p>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bedrooms'
                  placeholder='Beds'
                  min={1}
                  max={5}
                  className=' p-3 w-20 rounded-lg border-gray-400'
                />
                <p>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bedrooms'
                  placeholder='Beds'
                  min={50}
                  max={10000000}
                  className=' p-3 w-40 rounded-lg border-gray-400'
                />
                <p>Regular Price</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bedrooms'
                  placeholder='Beds'
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

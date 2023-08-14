import  { useState } from 'react';


const SavePasswordModal = ({ closeModal, onSave,password }) => {
  const [passwordName, setPasswordName] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(passwordName);
  };

  return (
   
            <div className="modal-content font-semibold shadow-xl bg-teal-900 rounded-lg shadow-black text-black/70 p-5 md:p-10 mx-auto my-16 max-w-md">

      <form onSubmit={handleSubmit}>



        <div className='flex gap-5 mt-3'> 

        <label className='text-white md:text-lg text-sm u'>
          Password Title :
        
        </label>

        <input  className=' rounded-md p-1 text-black uppercase'
            type="text"
            placeholder='write title'
            value={passwordName}
            onChange={(e) => setPasswordName(e.target.value)}
            />
            </div>
            <div className='flex gap-14 mt-8'> 

        <label className='text-white md:text-lg text-sm'>
          Password :
        
        </label>

        <input  className=' rounded-md p-1 text-black font-semibold uppercase'
            type="text"
            placeholder='write title'
            value={password}
            />
            </div>
            
            
          
            

        <div className='mt-10 md:20  flex justify-around'>

        <button
          className="bg-teal-700 text-white px-4 font-bold py-2 rounded hover:bg-teal-500"
          onClick={closeModal}
        >
          CLOSE
        </button>
        
        <button
          className="bg-teal-700 text-white font-bold px-4 py-2 rounded hover:bg-teal-500"
          type='submit'
        >
        SAVE
        </button>

        </div>
      </form>
      </div>
  );
};

export default SavePasswordModal;






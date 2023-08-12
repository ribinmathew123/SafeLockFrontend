import  { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import server from "../../Axios/axios";
import Swal from "sweetalert2";
import Navbar from "../Navbar/Navbar";

function TableData() {
  const [passwordData, setPasswordData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const user = JSON.parse(localStorage.getItem("userInfo"));
        const token = user?.token;
        const userId=user?._id
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await server.get(`/api/v1/save/${userId}`, config);
        setPasswordData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const deleteData = async (id) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user?.token
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await server.delete(`/api/v1/save/${id}`,config)
    return response.data
}





  const confirmDelete = async (id) => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-10",
        cancelButton:
          "bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });
try {
    const result = await swalWithTailwindButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await deleteData(id);
      const updatedData = passwordData.filter((data) => data._id !== id);
      setPasswordData(updatedData);
      swalWithTailwindButtons.fire(
        "Deleted!",
        "Your file has been deleted.",
        "success"
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithTailwindButtons.fire("Cancelled", "Your file is safe :)", "error");
      }
  } catch (error) {
    console.error("Error deleting:", error);
  }
};




const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: "13px",
      fontWeight: "bold",
      background: "#134E4A",
    },
  },
};




createTheme('solarized', {
  text: {
    primary: '#ffff',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Password",
      selector: (row) => row.password,
      
    },

    {
    name: "Actions",
    cell: (row) => (
      <button
        onClick={() => confirmDelete(row._id)} 
        className="p-2 bg-teal-900 rounded"
      >
        Delete
      </button>
    ),}
  ];


  return (
<>
    <Navbar/>
    <div className="flex justify-center bg-teal-900 min-h-screen">
      <div className="  m-auto md:w-1/2 md:p-10  bg-white rounded-lg shadow-2xl mt-28">
        <p className="p-5  tracking-widest text-2xl text-teal-900 font-bold  text-center">
           SAVED PASSWORDS
        </p>

        <div className="table-responsive">
  <DataTable
    className={`min-w-max`}
    columns={columns}
    data={passwordData}
    fixedHeader
    customStyles={tableCustomStyles}
    responsive
    highlightOnHover
    persistTableHead
    pagination
    theme="solarized"
    noDataComponent={<p className="my-8 font-semibold">No saved passwords.</p>}
    style={{
      overflowX: "auto",
    }}
  />







        </div>
        
        <div
          onClick={() => navigate("/")}
          className="w-full p-3 flex justify-center"
        >
          <button className="text-white text-lg font-extrabold tracking-widest bg-teal-900 hover:bg-teal-700 p-3 md:w-5/12 rounded-xl  ">
            Generate
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default TableData;
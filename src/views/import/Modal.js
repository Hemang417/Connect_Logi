//   import modalImport from "./modalImport";
  import { useEffect, useState } from "react";
  import {IMPO2D} from "./IMPO2D";
  import {IMPD2C} from "./IMPD2C";
  import { IMPCUSTOMER } from "./IMPCUSTOMER";
  
  
  export function Modal() {
        const [isshown, setIsShown] = useState("customerdetails");
        // const onClick = () => setShowResults(true)
    return (
        <div>
            {/* Open the modal using ID.showModal() method */}
{/* <button className="btn" onClick={()=>window.my_modal_1.showModal()}>open modal</button> */}
<div id="my_modal_1" className="modal w-full h-5/6">
  <div method="dialog" className="modal-box">
  <div class="grid gap-2 mb-2 md:grid-cols-6 m-2">
        <div>
            <label for="job_received_on" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">Job Received On</label>
        </div>
        <div>
            <input type="date" id="job_received_on" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block  -mx-9 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
            <label for="importer_name" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">Importer Name</label>
        </div>
        <div>
            <input type="text" id="importer_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-12 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
        <label for="countries" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">Mode</label></div>
            <div>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-12 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select</option>
                <option value="US">Sea</option>
                <option value="CA">Air</option>
            </select>
            </div>
            <div>
        <label for="countries" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">Container</label></div>
            <div>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-9 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select</option>
                <option value="US">20</option>
                <option value="CA">40</option>
                <option value="CA">LCL</option>
            </select>
            </div>
        <div>
            <label for="HBL/HAWB" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">HBL/HAWB No.</label>
        </div>
        <div>
            <input type="text" id="HBL/HAWB" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-12 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
            <label for="MBL/MAWB" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">MBL/MAWB No.</label>
        </div>
        <div>
            <input type="text" id="MBL/MAWB" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-12 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
            <label for="eta_date" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">ETA Date</label>
        </div>
        <div>
            <input type="date" id="eta_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block  -mx-9 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
            <label for="be_no" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">BE No.</label>
        </div>
        <div>
            <input type="text" id="be_no" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-12 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
            <label for="be_date" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">BE Date</label>
        </div>
        <div>
            <input type="date" id="be_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-12 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
            <label for="shipping_name" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">Shipping Line Name</label>
        </div>
        <div>
            <input type="text" id="shipping_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block  -mx-9 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
            <label for="cfs_name" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">CFS Name</label>
        </div>
        <div>
            <input type="text" id="cfs_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-12 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <label for="countries" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">DPD Type</label>
            <div>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block -mx-12 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select</option>
                <option value="US">Yes</option>
                <option value="CA">No</option>
            </select>
            </div>
        <div>
            <label for="custom_location" class="block mb-2 text-xs font-sans text-gray-900 dark:text-white">Custom Location</label>
        </div>
        <div>
            <input type="text" id="custom_location" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block  -mx-9 -my-1 w-40 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        {/* <div>
            <label for="custom_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custom Location</label>
            <input type="text" id="custom_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div> */}
    </div>
    <div>
      <hr className="border-t border-gray-800"></hr>
    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-800 dark:border-gray-700 dark:text-gray-400">
    <li class="mr-2" onClick={() => {setIsShown("customerdetails")}}>
                <button>
                <div class="inline-block p-4 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 hover:bg-gray-50">
                    Customer Details
                    {/* {showResults ? <modalImport /> : null} */}
                    {/* {isshown} */}
                </div>
                </button>
            </li>
            <li class="mr-2" onClick={() => {setIsShown("o2d")}}>
                <button>
                <div class="inline-block p-4 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 hover:bg-gray-50">
                    O2D
                    {/* {showResults ? <modalImport /> : null} */}
                    {/* {isshown} */}
                </div>
                </button>
            </li>
            <li class="mr-2" onClick={() => {setIsShown("d2c")}}>
                <div class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                    D2C
                    {/* {isshown && <JobExport />} */}
                </div>
            </li>
            <li class="mr-2">
                <div class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                    CRM
                    {/* {isshown && <JobExport />} */}
                </div>
            </li>
            <li class="mr-2">
                <div class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                    DOCUMENT TO BE UPLOADED
                    {/* {isshown && <JobExport />} */}
                </div>
            </li>
        </ul>
        {/* {showResults === "import" && <modalImport />} */}


        {isshown === "customerdetails" && <IMPCUSTOMER />}
        {isshown === "o2d" && <IMPO2D />}
        {isshown === "d2c" && <IMPD2C />}


    </div>
    
    {/* <div className="modal-action">
      <button className="btn float-right my-56 mx-10">Save</button>
    </div> */}
  </div>
</div>
        </div>        
    );
  }
  
  export default Modal;
import { UserData, UserModalProps } from "@/interfaces";
import React, { useState } from "react";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [user, setUser] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         const {name, value} = e.target;
         
         // Split name to handle nested properties like "address.street" or "address.geo.lat"
        const [parent, child, grandChild] = name.split('.');

        setUser(prevUser => {
        if (parent === 'address') {
            if (child === 'geo') {
            return {
                ...prevUser,
                address: {
                ...prevUser.address,
                geo: {
                    ...prevUser.address.geo,
                    [grandChild as 'lat' | 'lng']: value,
                },
                },
            };
            }
            return {
            ...prevUser,
            address: {
                ...prevUser.address,
                [child as 'street' | 'suite' | 'city' | 'zipcode']: value,
            },
           };
        } else if (parent === 'company') {
          return {
          ...prevUser,
          company: {
            ...prevUser.company,
            [child as 'name' | 'catchPhrase' | 'bs']: value,
          },
        };
       } else {
        // Direct properties (name, username, email, phone, website)
        return { ...prevUser, [name]: value };
       }
     });
    };

      // Handles form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(user); // Call the onSubmit prop with the current user data
        onClose(); // Close the modal after submission
   };

    return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto p-4"> {/* Added overflow-y-auto and p-4 for responsiveness */}
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg mx-auto my-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New User</h2>
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <fieldset className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
            <legend className="text-lg font-semibold text-gray-700 px-2 -ml-2">Personal Information</legend>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" value={user.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jane Doe" required />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
              <input type="text" id="username" name="username" value={user.username} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., janed" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" value={user.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., jane@example.com" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4 md:mb-0">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                <input type="text" id="phone" name="phone" value={user.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 1-555-123-4567" />
              </div>
              <div>
                <label htmlFor="website" className="block text-gray-700 font-medium mb-2">Website</label>
                <input type="text" id="website" name="website" value={user.website} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., example.org" />
              </div>
            </div>
          </fieldset>

          {/* Address Information Section */}
          <fieldset className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
            <legend className="text-lg font-semibold text-gray-700 px-2 -ml-2">Address</legend>
            <div className="mb-4">
              <label htmlFor="address.street" className="block text-gray-700 font-medium mb-2">Street</label>
              <input type="text" id="address.street" name="address.street" value={user.address.street} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 123 Main St" required />
            </div>
            <div className="mb-4">
              <label htmlFor="address.suite" className="block text-gray-700 font-medium mb-2">Suite</label>
              <input type="text" id="address.suite" name="address.suite" value={user.address.suite} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Apt. 101" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="address.city" className="block text-gray-700 font-medium mb-2">City</label>
                <input type="text" id="address.city" name="address.city" value={user.address.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., New York" required />
              </div>
              <div>
                <label htmlFor="address.zipcode" className="block text-gray-700 font-medium mb-2">Zipcode</label>
                <input type="text" id="address.zipcode" name="address.zipcode" value={user.address.zipcode} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 10001-1234" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="address.geo.lat" className="block text-gray-700 font-medium mb-2">Latitude (Geo)</label>
                <input type="text" id="address.geo.lat" name="address.geo.lat" value={user.address.geo.lat} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., -34.0522" />
              </div>
              <div>
                <label htmlFor="address.geo.lng" className="block text-gray-700 font-medium mb-2">Longitude (Geo)</label>
                <input type="text" id="address.geo.lng" name="address.geo.lng" value={user.address.geo.lng} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 118.2437" />
              </div>
            </div>
          </fieldset>

          {/* Company Information Section */}
          <fieldset className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
            <legend className="text-lg font-semibold text-gray-700 px-2 -ml-2">Company</legend>
            <div className="mb-4">
              <label htmlFor="company.name" className="block text-gray-700 font-medium mb-2">Company Name</label>
              <input type="text" id="company.name" name="company.name" value={user.company.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Acme Corp" />
            </div>
            <div className="mb-4">
              <label htmlFor="company.catchPhrase" className="block text-gray-700 font-medium mb-2">Catch Phrase</label>
              <input type="text" id="company.catchPhrase" name="company.catchPhrase" value={user.company.catchPhrase} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Innovate and Deliver" />
            </div>
            <div className="mb-4">
              <label htmlFor="company.bs" className="block text-gray-700 font-medium mb-2">Business Strategy (BS)</label>
              <input type="text" id="company.bs" name="company.bs" value={user.company.bs} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., B2B enterprise solutions" />
            </div>
          </fieldset>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div> 
  );
};

export default UserModal;
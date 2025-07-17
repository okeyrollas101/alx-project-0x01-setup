import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({  id, name, username, email, address, phone, website, company }) => {
  return (
    <div className="max-w-xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
      </div>
      <p className="text-gray-600">Email: {email}</p>
      <div className="mt-4 flex flex-col items-start justify-between text-sm text-gray-500">
        <span>User ID: {id}</span>
        <span>Username: {username}</span>
        <span>Phone: {phone}</span>
      </div>
      <div className="mt-4 flex flex-col items-start justify-between text-sm text-gray-500">
         <span>Address: {address.suite}, {address.street}, {address.city}</span>
         <span>Zipcode: {address.zipcode}</span>
         <span>Lat: {address.geo.lat} <br /> Long: {address.geo.lng}</span>
      </div>
      <div className="mt-4 flex flex-col items-start justify-between text-sm text-gray-500">
         <span>Website: {website}</span>
         <span>Company: {company.name}</span>
         <span>{company.catchPhrase}</span>
         <span>{company.bs}</span>
      </div>
    </div>
  );
};

export default UserCard;
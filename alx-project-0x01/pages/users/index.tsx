import Header from "@/components/layout/Header"
import { PostProps, UserData, UserProps } from "@/interfaces"
import UserCard  from "@/components/common/UserCard";
import PostCard from "@/components/common/PostCard";
import React, { useState } from "react";
import UserModal from "@/components/common/UserModal";

    interface UsersProps {
       users: UserProps[];
       posts: PostProps[];
   }
 
const Users: React.FC<UsersProps> = ({users: intialUsers, posts}) => {
    const [users, setUsers] = useState(intialUsers);
    const [isModalOpen, setModalOpen] = useState(false);
    

     const handleAddUser = (newUser: UserData) => {
        // Generate a new ID (in a real app, this would come from your API)
        const userWithId = {
        ...newUser,
        id: Math.max(...users.map(u => u.id), 0) + 1
        };
        setUsers([...users, userWithId]);
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="p-4">
                <div className="flex justify-between">
                    <h1 className=" text-2xl font-semibold">User Profile</h1>
                    <button 
                        onClick={() => setModalOpen(true)} 
                        className="bg-blue-700 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 text-white"
                    >
                            Add User
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {
                        users.map((user: UserProps) => (
                            <UserCard key={user.id} {...user} />
                        ))
                    }
                </div>

                {/* Posts Section */}
                <div>
                    <div className="flex justify-between mb-4">
                        <h1 className="text-2xl font-semibold">User Posts</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map((post: PostProps) => (
                        <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                    </div>
            </main>
              
              {isModalOpen && (
                    <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
                )}
        </div>
    )
}

export async function getStaticProps() {
  const [usersRes, postsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts")
  ]);

  const [users, posts] = await Promise.all([
    usersRes.json(),
    postsRes.json(),
  ])

  return {
    props: {
      users,
      posts
    }
  };
}

export default Users;
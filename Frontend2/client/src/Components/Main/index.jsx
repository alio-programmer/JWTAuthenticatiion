import React from "react";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-black child:bg-white">
      <nav>
        <h1 className="text-5xl">facebook</h1>
        <button className="p-3 m-5" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;

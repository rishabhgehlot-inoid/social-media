const Footer = () => {
  return (
    <div className=" w-full bg-black p-5 h-18">
      <main className=" flex justify-around gap-5">
        <h1 className=" text-2xl font-bold text-white">Socials</h1>
        <ul className=" pt-1 font-bold text-white items-center">
          <li>Feed</li>
          <li>Network</li>
        </ul>
        <ul className=" pt-1 font-bold text-white items-center">
          <li>Profile</li>
          <li>Search</li>
        </ul>
        <ul className=" pt-1 font-bold text-white items-center">
          <li>Add Post</li>
          <li>Message</li>
        </ul>
      </main>
      <div className=" text-center pt-5 text-white">
        Copyright © 2024 Social Media
      </div>
    </div>
  );
};

export default Footer;

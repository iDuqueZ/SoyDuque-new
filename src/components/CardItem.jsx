const AstroComponent = ({ url, imageUrl, title, date, description }) => {
  return (
    <li className="bg-white rounded-md shadow-md  overflow-hidden">
      <a href={url} className="text-teal-600 group">
        <div className="mb-2 h-auto overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover rounded-t-md transition-scale brightness-75 duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-100"
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-teal-600 font-semibold mb-5">{title}</h2>
          <span className="text-sm text-zinc-400">{date}</span>
          <p className="text-sm">{description}</p>
        </div>
      </a>
    </li>
  );
};

export default AstroComponent;
